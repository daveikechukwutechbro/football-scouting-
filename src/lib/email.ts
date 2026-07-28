import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const url = `${BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"ProScout Football" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email — ProScout Football",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <div style="margin-bottom: 24px;">
          <div style="width: 40px; height: 40px; background: #059669; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0;">Verify your email address</h1>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px;">
          Thank you for registering with ProScout Football. Click the button below to verify your email and activate your account.
        </p>
        <a href="${url}" style="display: inline-block; padding: 14px 28px; background: #059669; color: white; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px;">
          Verify Email Address
        </a>
        <p style="font-size: 13px; color: #94A3B8; margin: 24px 0 0; line-height: 1.5;">
          Or copy this link into your browser:<br>
          <span style="color: #059669;">${url}</span>
        </p>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;">
        <p style="font-size: 12px; color: #94A3B8; margin: 0;">
          If you didn't create an account with ProScout, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
