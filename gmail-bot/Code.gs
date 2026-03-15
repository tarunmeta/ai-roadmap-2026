// ═══════════════════════════════════════════════════════════
// NEURAL PROTOCOL — Gmail AI Auto-Responder
// Uses Claude API to reply to user emails automatically
//
// SETUP:
// 1. Go to script.google.com
// 2. Create new project → paste this code
// 3. Add your API key in Project Settings → Script Properties
//    Key: ANTHROPIC_API_KEY  Value: sk-ant-...
// 4. Run setupTrigger() once to start auto-checking every 5 mins
// ═══════════════════════════════════════════════════════════

const ANTHROPIC_API_KEY = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY')
const LABEL_PROCESSED   = 'np-bot-replied'
const LABEL_SKIP        = 'np-bot-skip'

// ── SYSTEM PROMPT ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are the Neural Protocol AI support assistant. Neural Protocol is an AI/ML learning platform for Indian engineers.

About Neural Protocol:
- 10 phases from Python to AI Agents
- 300 curated topics with Hindi + English YouTube videos
- Free: Phase 1 (Python Foundations) forever
- Pro Monthly: ₹200/month — all 10 phases
- Pro Lifetime: ₹999 one-time — all 10 phases forever
- Payment via UPI: tarunsaini89689-1@okaxis
- WhatsApp support: +91 97811 91041
- Website: https://ai-roadmap-2026-bice.vercel.app

Your job:
- Answer questions about the curriculum, phases, pricing
- Help users who are stuck on topics
- Guide them to the right resources
- If someone wants to buy, explain the UPI payment process
- Be friendly, helpful, and encouraging
- Reply in the same language the user writes in (Hindi or English)
- Keep replies concise — under 200 words unless detailed help is needed
- Sign off as: Neural Protocol Support Bot 🤖

Do NOT:
- Make up information not listed above
- Promise features that don't exist
- Share personal information about other users`

// ── MAIN FUNCTION (runs every 5 mins) ─────────────────────
function checkAndReply() {
  try {
    // Get unread emails NOT already processed
    const processedLabel = getOrCreateLabel(LABEL_PROCESSED)
    const skipLabel      = getOrCreateLabel(LABEL_SKIP)

    const threads = GmailApp.search(
      `is:unread -label:${LABEL_PROCESSED} -label:${LABEL_SKIP} -from:me`,
      0, 20
    )

    if (threads.length === 0) return

    Logger.log(`Found ${threads.length} unread threads`)

    threads.forEach(thread => {
      try {
        const messages = thread.getMessages()
        const lastMsg  = messages[messages.length - 1]

        // Skip if we sent the last message (avoid loops)
        if (lastMsg.getFrom().includes(Session.getEffectiveUser().getEmail())) {
          thread.addLabel(processedLabel)
          return
        }

        const from    = lastMsg.getFrom()
        const subject = lastMsg.getSubject()
        const body    = lastMsg.getPlainBody().slice(0, 2000) // limit length

        Logger.log(`Replying to: ${from} | Subject: ${subject}`)

        // Generate AI reply
        const reply = generateReply(subject, body, from)

        if (reply) {
          // Send reply
          thread.reply(reply)
          thread.addLabel(processedLabel)
          thread.markRead()
          Logger.log(`Replied to: ${from}`)
        }

        // Avoid rate limits
        Utilities.sleep(1000)

      } catch(e) {
        Logger.log(`Error processing thread: ${e.message}`)
      }
    })

  } catch(e) {
    Logger.log(`checkAndReply error: ${e.message}`)
  }
}

// ── GENERATE REPLY VIA CLAUDE API ─────────────────────────
function generateReply(subject, body, from) {
  if (!ANTHROPIC_API_KEY) {
    Logger.log('ERROR: ANTHROPIC_API_KEY not set in Script Properties')
    return null
  }

  const userMessage = `Email from: ${from}
Subject: ${subject}

Message:
${body}

Please write a helpful reply to this email.`

  const payload = {
    model: 'claude-3-haiku-20240307', // Fast + cheap for support emails
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }]
  }

  const options = {
    method: 'post',
    headers: {
      'x-api-key':         ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  }

  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options)
  const data     = JSON.parse(response.getContentText())

  if (data.error) {
    Logger.log(`Claude API error: ${JSON.stringify(data.error)}`)
    return null
  }

  return data.content?.[0]?.text || null
}

// ── SETUP: Create time-based trigger ──────────────────────
function setupTrigger() {
  // Delete existing triggers first
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t))

  // Check every 5 minutes
  ScriptApp.newTrigger('checkAndReply')
    .timeBased()
    .everyMinutes(5)
    .create()

  Logger.log('✅ Trigger set: checkAndReply runs every 5 minutes')
}

// ── SETUP: Remove trigger ──────────────────────────────────
function removeTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t))
  Logger.log('✅ All triggers removed')
}

// ── HELPER: Get or create Gmail label ─────────────────────
function getOrCreateLabel(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name)
}

// ── TEST: Run manually to test one reply ──────────────────
function testReply() {
  const reply = generateReply(
    'Question about Neural Protocol',
    'Hi, I want to know about the pricing. Is Phase 1 really free? How do I pay for Pro?',
    'test@example.com'
  )
  Logger.log('Test reply:\n' + reply)
}
