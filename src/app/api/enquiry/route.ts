// src/app/api/enquiry/route.ts
import { NextResponse } from "next/server";
import {
  sendEnquiryEmail,
  sendWhatsAppNotification,
  isEmailConfigured,
  type EnquiryPayload,
} from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseBody(body: unknown): EnquiryPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const b = body as Record<string, unknown>;
  const variant = b.variant === "quote" ? "quote" : b.variant === "contact" ? "contact" : null;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : undefined;
  const category = typeof b.category === "string" ? b.category.trim() : undefined;
  const quantity = typeof b.quantity === "string" ? b.quantity.trim() : undefined;
  const honeypot = typeof b.website === "string" ? b.website : "";

  if (honeypot) return { error: "Spam detected." };
  if (!variant) return { error: "Invalid form type." };
  if (!name || name.length < 2) return { error: "Please enter your name." };
  if (!email || !EMAIL_RE.test(email)) return { error: "Please enter a valid email." };
  if (!phone || phone.length < 6) return { error: "Please enter a valid phone number." };
  if (!message || message.length < 10) {
    return { error: "Please provide more detail in your message." };
  }

  return {
    variant,
    name,
    email,
    phone,
    message,
    company: company || undefined,
    category: category || undefined,
    quantity: quantity || undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseBody(body);

    if ("error" in parsed) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    // 1. Send WhatsApp notification (always — no config needed)
    await sendWhatsAppNotification(parsed);

    // 2. Send email if configured (Resend / SMTP / Webhook)
    await sendEnquiryEmail(parsed);

    return NextResponse.json({
      ok: true,
      message: "Your enquiry has been sent. We will respond during business hours.",
      emailConfigured: isEmailConfigured(),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to send enquiry. Please call our office.";

    const status =
      message.includes("not configured") && process.env.NODE_ENV === "production" ? 503 : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}