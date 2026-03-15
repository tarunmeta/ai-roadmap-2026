# 🔥 Firebase Setup Guide — AI Roadmap 2026
## Do this ONCE. Takes 15–20 minutes.

---

## STEP 1 — Create Firebase Project (5 min)

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Name it: `ai-roadmap-2026`
4. Disable Google Analytics (not needed) → **Create project**
5. Wait ~30 seconds for project to create

---

## STEP 2 — Add Web App & Get Config (3 min)

1. In your project dashboard, click the **`</>`** (Web) icon
2. App nickname: `AI Roadmap Web`
3. Do NOT check "Firebase Hosting" → click **Register app**
4. You'll see a `firebaseConfig` object like this:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ai-roadmap-2026.firebaseapp.com",
  projectId: "ai-roadmap-2026",
  storageBucket: "ai-roadmap-2026.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abc123"
};
```

5. **Copy these values** → paste into `src/firebase.js`
   (Replace the PASTE_YOUR_... placeholders)

---

## STEP 3 — Enable Authentication (2 min)

1. Left sidebar → **Build → Authentication**
2. Click **"Get started"**
3. Click **"Email/Password"** provider
4. Toggle **Enable** → Save

---

## STEP 4 — Create Firestore Database (3 min)

1. Left sidebar → **Build → Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add rules next)
4. Choose region: **asia-south1 (Mumbai)** → Enable

---

## STEP 5 — Set Security Rules (2 min)

1. In Firestore → click **"Rules"** tab
2. Delete everything there
3. Copy the entire content of `firestore.rules` file
4. Paste it in → click **Publish**

> ⚠️ Before publishing rules, you need YOUR admin UID:
> - Register on your own app first
> - Go to Firebase → Authentication → Users → copy your UID
> - Replace `ADMIN_UID_HERE` in the rules with your UID
> - Then publish

---

## STEP 6 — Deploy & Test

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
# Push to GitHub → import on vercel.com
```

---

## STEP 7 — Verify Everything Works

Open your app and:

1. ✅ Register a new account → OTP shows → verify → logged in
2. ✅ Complete a topic → refresh page → topic still done ✓
3. ✅ Login on a different browser → same progress shows
4. ✅ Open Admin Panel → Generate a key → Enter key in app → Pro unlocked

---

## 🗃 What Gets Saved Where

```
Firebase Authentication
└── User accounts (email + password, hashed by Google)

Firestore Database
├── users/
│   └── {uid}/
│       ├── name, email, plan, createdAt
│       ├── progress/
│       │   └── {topicId}: { done, grasp, note, timeMs }
│       └── productivity/
│           └── {date}: { topics, minutes }
└── accessKeys/
    └── {KEY}: { planId, label, usedBy, createdAt }
```

---

## 💰 Firebase Free Tier Limits

| Feature | Free Limit | Your Usage |
|---------|-----------|------------|
| Authentication | 10,000 users/month | You won't hit this |
| Firestore reads | 50,000/day | ~100 reads per user/day → handles 500 users free |
| Firestore writes | 20,000/day | ~20 writes per user/day → handles 1000 users free |
| Storage | 1 GB | Your QR image is 80KB — fine |

**Bottom line: Completely free until you have 500+ daily active users.**

---

## 🆘 Common Errors

**"Firebase: Error (auth/configuration-not-found)"**
→ You haven't pasted the config into `src/firebase.js` yet

**"Missing or insufficient permissions"**
→ Your Firestore rules aren't published, or you're not logged in

**"auth/network-request-failed"**
→ Check your internet connection

**Admin Panel shows empty even after generating keys**
→ Make sure Firestore rules allow your UID to create keys (Step 5)

---

## 📞 Need Help?
WhatsApp: +91 97811 91041
