import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { auth } from "@/lib/auth";

function generateRefNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "PS-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const existing = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const playerExists = await prisma.player.findUnique({ where: { userId: existing.id } });
    if (playerExists) {
      return NextResponse.json({ error: "Player profile already exists" }, { status: 409 });
    }

    const body = await req.json();
    const {
      firstName, lastName, dateOfBirth, nationality,
      country, city, phoneNumber,
      guardianName, guardianRelationship, guardianEmail, guardianPhone,
      currentPosition, secondaryPosition, preferredFoot, currentLevel,
      contractStatus, currentClub, yearsExperience, previousClubs,
      height, weight, bodyType, fitnessLevel, injuries,
      totalAppearances, totalGoals, totalAssists, cleanSheets,
      yellowCards, redCards,
      biography, playingStyle, strengths, weaknesses,
      favoritePosition, favoritePlayer, careerGoal, motivation,
      videos,
      availableForTrials, availableImmediately, canTravel, canRelocate,
      preferredCountry, preferredLeague, preferredTrialDates, preferredCommunication,
      socialLinks,
    } = body;

    const age = dateOfBirth
      ? Math.floor((Date.now() - new Date(dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      : 0;

    const player = await prisma.player.create({
      data: {
        userId: existing.id,
        firstName: firstName || "",
        lastName: lastName || "",
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
        nationality: nationality || "",
        countryOfResidence: country || "",
        city: city || "",
        phoneNumber: phoneNumber || "",
      },
    });

    if (age < 18 && guardianName) {
      await prisma.guardianInfo.create({
        data: {
          playerId: player.id,
          name: guardianName,
          relationship: guardianRelationship || "",
          email: guardianEmail || "",
          phone: guardianPhone || "",
        },
      });
    }

    if (currentPosition) {
      await prisma.footballProfile.create({
        data: {
          playerId: player.id,
          primaryPosition: currentPosition,
          secondaryPosition: secondaryPosition || null,
          preferredFoot: preferredFoot || "",
          currentLevel: currentLevel || "",
          contractStatus: contractStatus || "",
          currentClub: currentClub || null,
          yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
          previousClubs: previousClubs || null,
        },
      });
    }

    if (height || weight) {
      await prisma.physicalProfile.create({
        data: {
          playerId: player.id,
          heightCm: height ? parseInt(height) : 0,
          weightKg: weight ? parseInt(weight) : 0,
          bodyType: bodyType || null,
          fitnessLevel: fitnessLevel || null,
          injuries: injuries || null,
        },
      });
    }

    if (totalAppearances !== undefined || totalGoals !== undefined) {
      await prisma.careerStatistics.create({
        data: {
          playerId: player.id,
          totalAppearances: totalAppearances ? parseInt(totalAppearances) : 0,
          totalGoals: totalGoals ? parseInt(totalGoals) : 0,
          totalAssists: totalAssists ? parseInt(totalAssists) : 0,
          cleanSheets: cleanSheets ? parseInt(cleanSheets) : null,
          yellowCards: yellowCards ? parseInt(yellowCards) : null,
          redCards: redCards ? parseInt(redCards) : null,
        },
      });
    }

    if (playingStyle || strengths) {
      await prisma.playingStyleRecord.create({
        data: {
          playerId: player.id,
          biography: biography || null,
          playingStyle: playingStyle || "",
          strengths: strengths || "",
          weaknesses: weaknesses || null,
          favoritePosition: favoritePosition || null,
          favoritePlayer: favoritePlayer || null,
          careerGoal: careerGoal || null,
          motivation: motivation || null,
        },
      });
    }

    if (videos && videos.length > 0) {
      await prisma.playerMedia.create({
        data: {
          playerId: player.id,
          videos: JSON.stringify(videos),
        },
      });
    }

    if (availableForTrials !== null || availableImmediately !== null) {
      await prisma.playerAvailability.create({
        data: {
          playerId: player.id,
          availableForTrials: availableForTrials ?? false,
          availableImmediately: availableImmediately ?? false,
          canTravel: canTravel ?? false,
          canRelocate: canRelocate ?? false,
          preferredCountry: preferredCountry || null,
          preferredLeague: preferredLeague || null,
          preferredTrialDates: preferredTrialDates || null,
          preferredCommunication: preferredCommunication || "email",
        },
      });
    }

    if (socialLinks && Object.keys(socialLinks).length > 0) {
      await prisma.playerSocialLinks.create({
        data: {
          playerId: player.id,
          instagram: socialLinks.instagram || null,
          facebook: socialLinks.facebook || null,
          tiktok: socialLinks.tiktok || null,
          youtube: socialLinks.youtube || null,
          twitter: socialLinks.twitter || null,
          linkedin: socialLinks.linkedin || null,
        },
      });
    }

    const refNumber = generateRefNumber();

    await prisma.application.create({
      data: {
        playerId: player.id,
        status: "submitted",
        refNumber,
      },
    });

    return NextResponse.json({
      success: true,
      refNumber,
      playerId: player.id,
    }, { status: 201 });
  } catch (error) {
    console.error("Registration submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
