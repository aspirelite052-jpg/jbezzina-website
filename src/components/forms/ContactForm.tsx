// src/components/forms/ContactForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "35677576721"; // +356 77576721

type ContactFormProps = {
  variant?: "contact" | "quote";
};

export default function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const message = data.get("message") as string;
    const category = data.get("category") as string;
    const quantity = data.get("quantity") as string;

    const payload = {
      variant,
      name,
      company,
      email,
      phone,
      message,
      category,
      quantity,
      website: data.get("website"),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to send enquiry.");
      }

      // Build WhatsApp message and open it in a new tab
      const label = variant === "quote" ? "📋 Quote Request" : "📩 Contact Enquiry";
      const waLines = [
        `${label} via jbezzina.store`,
        "",
        `*Name:* ${name}`,
        company ? `*Company:* ${company}` : null,
        `*Email:* ${email}`,
        `*Phone:* ${phone}`,
        category ? `*Category:* ${category}` : null,
        quantity ? `*Quantity/scope:* ${quantity}` : null,
        "",
        `*Message:*`,
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waLines)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us during business hours."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-sm border border-border bg-surface p-8 text-center"
        role="status"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <MessageCircle className="h-7 w-7 text-green-600" aria-hidden />
        </div>
        <p className="font-heading text-lg font-bold text-primary">
          Enquiry sent!
        </p>
        <p className="mt-2 text-sm text-secondary">
          Your message has been sent via WhatsApp. Our team will respond during business hours (Mon–Fri, 07:00–16:00).
        </p>
        <p className="mt-3 text-xs text-secondary">
          If WhatsApp didn&apos;t open automatically,{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
          >
            click here to open it
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-sm border border-border bg-surface p-6 md:p-8"
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 opacity-0"
        aria-hidden
      />

      {error && (
        <div
          className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
            Full name *
          </label>
          <input
            id="name" name="name" type="text" required disabled={loading}
            autoComplete="name"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
            Company
          </label>
          <input
            id="company" name="company" type="text" disabled={loading}
            autoComplete="organization"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
            Email *
          </label>
          <input
            id="email" name="email" type="email" required disabled={loading}
            autoComplete="email"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
            Phone *
          </label>
          <input
            id="phone" name="phone" type="tel" required disabled={loading}
            autoComplete="tel"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
          />
        </div>
      </div>

      {variant === "quote" && (
        <>
          <div>
            <label htmlFor="category" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
              Product category
            </label>
            <select
              id="category" name="category" disabled={loading}
              className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
            >
              <option value="">Select a category</option>
              <option value="Industrial Fasteners">Industrial Fasteners</option>
              <option value="Power Tools">Power Tools</option>
              <option value="Safety Equipment">Safety Equipment</option>
              <option value="Hydraulics">Hydraulics</option>
              <option value="Electrical Supplies">Electrical Supplies</option>
              <option value="Mechanical Components">Mechanical Components</option>
              <option value="Engineering Tools">Engineering Tools</option>
              <option value="Workshop Equipment">Workshop Equipment</option>
              <option value="Engineering Consumables">Engineering Consumables</option>
              <option value="Other">Other / General enquiry</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
              Estimated quantity / scope
            </label>
            <input
              id="quantity" name="quantity" type="text" disabled={loading}
              placeholder="e.g. M12 bolts — 500 off, or monthly tool replenishment"
              className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary">
          {variant === "quote" ? "Quote details *" : "Message *"}
        </label>
        <textarea
          id="message" name="message" required disabled={loading} rows={5}
          placeholder={
            variant === "quote"
              ? "Part numbers, grades (e.g. 8.8), dimensions, delivery to site or Marsa collection..."
              : "How can we assist your workshop or site?"
          }
          className="w-full resize-y rounded-sm border border-border bg-background px-4 py-3 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-70">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <MessageCircle className="h-4 w-4" aria-hidden />
            {variant === "quote" ? "Send via WhatsApp" : "Send via WhatsApp"}
            <Send className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>

      <p className="text-xs text-secondary">
        * Required fields. Your enquiry will be sent directly to our WhatsApp. We respond Mon–Fri, 07:00–16:00.
      </p>
    </form>
  );
}