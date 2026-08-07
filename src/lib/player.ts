import crypto from "crypto";
import { getAdminDb } from "@/lib/firebase-admin";

export function generateRefNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "PS-";
  for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export function parsePlayerPayload(body: any) {
  const age = body.dateOfBirth
    ? Math.floor((Date.now() - new Date(body.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;

  const guardian =
    body.guardianName || body.guardianEmail || body.guardianPhone
      ? {
          name: body.guardianName || "",
          relationship: body.guardianRelationship || "",
          email: body.guardianEmail || "",
          phone: body.guardianPhone || "",
        }
      : null;

  const footballProfile = {
    primaryPosition: body.currentPosition || "",
    secondaryPosition: body.secondaryPosition || null,
    preferredFoot: body.preferredFoot || "",
    currentLevel: body.currentLevel || "",
    contractStatus: body.contractStatus || "",
    currentClub: body.currentClub || null,
    yearsExperience: body.yearsExperience ? Number(body.yearsExperience) : null,
    previousClubs: body.previousClubs || null,
  };

  const physicalProfile = {
    heightCm: body.height ? Number(body.height) : 0,
    weightKg: body.weight ? Number(body.weight) : 0,
    bodyType: body.bodyType || null,
    fitnessLevel: body.fitnessLevel || null,
    injuries: body.injuries || null,
  };

  const careerStats = {
    totalAppearances: body.totalAppearances ? Number(body.totalAppearances) : 0,
    totalGoals: body.totalGoals ? Number(body.totalGoals) : 0,
    totalAssists: body.totalAssists ? Number(body.totalAssists) : 0,
    cleanSheets: body.cleanSheets ? Number(body.cleanSheets) : null,
    yellowCards: body.yellowCards ? Number(body.yellowCards) : null,
    redCards: body.redCards ? Number(body.redCards) : null,
  };

  const playingStyle =
    body.playingStyle || body.strengths || body.biography
      ? {
          biography: body.biography || null,
          playingStyle: body.playingStyle || "",
          strengths: body.strengths || "",
          weaknesses: body.weaknesses || null,
          favoritePosition: body.favoritePosition || null,
          favoritePlayer: body.favoritePlayer || null,
          careerGoal: body.careerGoal || null,
          motivation: body.motivation || null,
        }
      : null;

  const availability =
    body.availableForTrials !== null || body.preferredCommunication
      ? {
          availableForTrials: body.availableForTrials ?? false,
          availableImmediately: body.availableImmediately ?? false,
          canTravel: body.canTravel ?? false,
          canRelocate: body.canRelocate ?? false,
          preferredCountry: body.preferredCountry || null,
          preferredLeague: body.preferredLeague || null,
          preferredTrialDates: body.preferredTrialDates || null,
          preferredCommunication: body.preferredCommunication || "",
        }
      : null;

  const socialLinks = body.socialLinks || null;
  const documents = body.documents || [];
  const media = body.videos && body.videos.length > 0 ? { videos: JSON.stringify(body.videos) } : null;

  return {
    firstName: body.firstName || "",
    lastName: body.lastName || "",
    dateOfBirth: body.dateOfBirth || "",
    nationality: body.nationality || "",
    countryOfResidence: body.country || "",
    city: body.city || "",
    phoneNumber: body.phoneNumber || "",
    age,
    guardian,
    footballProfile,
    physicalProfile,
    careerStats,
    playingStyle,
    availability,
    socialLinks,
    documents,
    media,
  };
}

export async function createPlayer(uid: string, email: string, body: any, options?: { payment?: any }) {
  const db = getAdminDb();
  const existing = await db.ref(`players/${uid}`).get();
  if (existing.exists()) {
    return { status: 409 as const, error: "Player profile already exists" };
  }

  const refNumber = generateRefNumber();
  const now = new Date().toISOString();
  const status = "submitted";

  const payload = parsePlayerPayload(body);

  await db.ref(`players/${uid}`).set({
    uid,
    email,
    user: { email, createdAt: now },
    ...payload,
    refNumber,
    status,
    createdAt: now,
    payment: options?.payment
      ? {
          status: "paid",
          provider: "flutterwave",
          transactionId: options.payment.transactionId || null,
          amount: options.payment.amount || null,
          currency: options.payment.currency || "USD",
          paidAt: options.payment.paidAt || now,
        }
      : null,
    applications: [{ id: refNumber, status, refNumber, notes: null, submittedAt: now }],
  });

  return { status: 201 as const, refNumber };
}
