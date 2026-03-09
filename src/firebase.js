import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyAoeG8vWcMsTr5qsJ-D7-a4-Vd7ivcerVc",
  authDomain:        "ai-roadmap-2026.firebaseapp.com",
  projectId:         "ai-roadmap-2026",
  storageBucket:     "ai-roadmap-2026.firebasestorage.app",
  messagingSenderId: "494731868307",
  appId:             "1:494731868307:web:11cc7bd7f1d496b1f03566",
  measurementId:     "G-K2K57ENND8"
}

const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db   = getFirestore(app)
export default app
