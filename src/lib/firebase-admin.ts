import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function getApp(): App {
  if (app) return app;
  const existing = getApps()[0];
  if (existing) {
    app = existing;
    return existing;
  }

  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const serviceAccount = encoded
    ? JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"))
    : {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID || "infoproscoutt-5e923",
        private_key: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
      };

  app = initializeApp({ credential: cert(serviceAccount) });
  return app;
}

export function getAdminAuth(): Auth {
  if (!authInstance) authInstance = getAuth(getApp());
  return authInstance;
}

export function getAdminDb(): Firestore {
  if (!dbInstance) dbInstance = getFirestore(getApp());
  return dbInstance;
}
