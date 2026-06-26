"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

type HeroProps = {
  headline: string;
  subheadline: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
};

export default function Hero({
  headline,
  subheadline,
  primaryCta = { label: "Request Quote", href: "/quote" },
  secondaryCta = { label: "Contact Us", href: "/contact" },
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-primary ${
        compact ? "py-16 md:py-20" : "min-h-[520px] md:min-h-[600px]"
      }`}
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

      <div
        className={`container-industrial relative flex ${
          compact ? "items-center" : "min-h-[520px] items-center md:min-h-[600px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl py-12"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Marsa Industrial Area · Malta
          </p>
          <h1
            id="hero-heading"
            className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {subheadline}
          </p>
          {!compact && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href={secondaryCta.href} className="btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden />
                {secondaryCta.label}
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" aria-hidden />
    </section>
  );
}
