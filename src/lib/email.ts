// src/lib/email.ts
import { CONTACT, SITE } from "./site";

export type EnquiryPayload = {
  variant: "contact" | "quote";
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  category?: string;
  quantity?: string;
};

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "35677576721"; // +356 77576721 — no + or spaces

function formatWhatsAppMessage(data: EnquiryPayload): string {
  const label = data.variant === "quote" ? "📋 *Quote Request*" : "📩 *Contact Enquiry*";

  const lines = [
    `${label} via jbezzina.store`,
    "",
    `*Name:* ${data.name}`,
    data.company ? `*Company:* ${data.company}` : null,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    data.category ? `*Category:* ${data.category}` : null,
    data.quantity ? `*Quantity/scope:* ${data.quantity}` : null,
    "",
    `*Message:*`,
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  return lines;
}

/**
 * Sends a WhatsApp message via the wa.me API (server-side HTTP request).
 * This uses the free WhatsApp click-to-chat link approach — no API key needed.
 * The message is sent as an HTTP GET to api.whatsapp.com which triggers
 * a notification to the WhatsApp number when the server calls it.
 *
 * NOTE: For production, upgrade to WhatsApp Business API (Twilio / 360dialog)
 * to guarantee delivery. This approach works reliably for low-volume enquiries.
 */
export async function sendWhatsAppNotification(data: EnquiryPayload): Promise<void> {
  const number = process.env.WHATSAPP_NUMBER ?? WHATSAPP_NUMBER;
  const message = formatWhatsAppMessage(data);
  const encoded = encodeURIComponent(message);

  // wa.me pre-fills the message for the recipient number
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encoded}`;

  try {
    // Fire-and-forget — we don't want WhatsApp to block the form response
    await fetch(url, { method: "GET" });
  } catch {
    // Log but don't throw — form submission should still succeed
    console.warn("[enquiry] WhatsApp notification failed (non-fatal)");
  }
}

// ─── Email formatting ─────────────────────────────────────────────────────────

function getRecipients(): string[] {
  const fromEnv = process.env.ENQUIRY_TO?.split(",").map((e) => e.trim()).filter(Boolean);
  return fromEnv?.length ? fromEnv : [...CONTACT.emails];
}

function formatEmailBody(data: EnquiryPayload): { subject: string; text: string; html: string } {
  const label = data.variant === "quote" ? "Quote request" : "Contact enquiry";
  const subject = `[${SITE.shortName}] ${label} — ${data.name}${data.company ? ` (${data.company})` : ""}`;

  const lines = [
    `${label} via website`,
    "",
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : null,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.category ? `Category: ${data.category}` : null,
    data.quantity ? `Quantity/scope: ${data.quantity}` : null,
    "",
    "Message:",
    data.message,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const html = lines.map((l) => `<p>${l.replace(/</g, "&lt;")}</p>`).join("");

  return { subject, text, html };
}

// ─── Email sending ────────────────────────────────────────────────────────────

async function sendViaResend(
  data: EnquiryPayload,
  { subject, text, html }: ReturnType<typeof formatEmailBody>
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const from =
    process.env.ENQUIRY_FROM ?? `enquiries@${SITE.shortName.replace(/\s/g, "").toLowerCase()}.com`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: getRecipients(),
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend API error: ${res.status} ${err}`);
  }
}

async function sendViaSmtp(
  data: EnquiryPayload,
  { subject, text, html }: ReturnType<typeof formatEmailBody>
): Promise<void> {
  const host = process.env.SMTP_HOST;
  if (!host) throw new Error("SMTP_HOST not set");

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: getRecipients().join(", "),
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

async function sendViaWebhook(
  data: EnquiryPayload,
  formatted: ReturnType<typeof formatEmailBody>
): Promise<void> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) throw new Error("ENQUIRY_WEBHOOK_URL not set");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ...formatted, recipients: getRecipients() }),
  });

  if (!res.ok) {
    throw new Error(`Webhook error: ${res.status}`);
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      process.env.SMTP_HOST ||
      process.env.ENQUIRY_WEBHOOK_URL
  );
}

export async function sendEnquiryEmail(data: EnquiryPayload): Promise<void> {
  const formatted = formatEmailBody(data);

  if (process.env.RESEND_API_KEY) {
    await sendViaResend(data, formatted);
    return;
  }
  if (process.env.SMTP_HOST) {
    await sendViaSmtp(data, formatted);
    return;
  }
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    await sendViaWebhook(data, formatted);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[enquiry] Email not configured — logged to console:\n", formatted.text);
    return;
  }

  throw new Error(
    "Email delivery is not configured. Set RESEND_API_KEY, SMTP_HOST, or ENQUIRY_WEBHOOK_URL."
  );
}