import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@proscout.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        role: "admin",
        name: "Admin",
      },
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  const trialCount = await prisma.trial.count();
  if (trialCount === 0) {
    await prisma.trial.createMany({
      data: [
        {
          title: "Premier League Open Trials",
          location: "London, UK",
          date: new Date("2026-09-15"),
          positions: JSON.stringify(["striker", "central-midfielder", "center-back"]),
          deadline: new Date("2026-09-01"),
          description: "Official open trials for Premier League clubs. Show your talent and get scouted by top-tier scouts.",
        },
        {
          title: "La Liga Youth Discovery",
          location: "Barcelona, Spain",
          date: new Date("2026-10-05"),
          positions: JSON.stringify(["attacking-midfielder", "right-winger", "left-winger"]),
          deadline: new Date("2026-09-25"),
          description: "Youth scouting program for La Liga academies. Ages 16-21 welcome.",
        },
        {
          title: "MLS Combine",
          location: "Miami, USA",
          date: new Date("2026-11-20"),
          positions: JSON.stringify(["goalkeeper", "defensive-midfielder", "center-back"]),
          deadline: new Date("2026-11-05"),
          description: "Major League Soccer combine for unsigned players. Direct contracts possible.",
        },
        {
          title: "Bundesliga Talent Camp",
          location: "Munich, Germany",
          date: new Date("2026-12-10"),
          positions: JSON.stringify(["right-back", "left-back", "center-forward"]),
          deadline: new Date("2026-11-25"),
          description: "Intensive 5-day training camp with Bundesliga scouts and coaches.",
        },
      ],
    });
    console.log("Sample trials created");
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
