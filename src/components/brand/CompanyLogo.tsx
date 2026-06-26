"use client";

import Image from "next/image";
import { useState } from "react";
import { Anchor } from "lucide-react";
import { BRAND, SITE } from "@/lib/site";

type CompanyLogoProps = {
  showText?: boolean;
};

export default function CompanyLogo({ showText = false }: CompanyLogoProps) {
  const [src, setSrc] = useState<string>(BRAND.logoPng);
  const [failed, setFailed] = useState(false);

  function handleError() {
    if (src === BRAND.logoPng) {
      setSrc(BRAND.logoSvg);
      return;
    }
    setFailed(true);
  }

  return (
    <>
      {!failed ? (
        <Image
          src={src}
          alt={BRAND.logoAlt}
          width={260}
          height={72}
          className="h-14 w-auto max-w-[260px] object-contain object-left md:h-16"
          priority
          onError={handleError}
        />
      ) : (
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-primary text-accent md:h-16 md:w-16"
          aria-hidden
        >
          <Anchor className="h-7 w-7" />
        </span>
      )}

      {showText && (
        <span className="hidden sm:block">
          <span className="block font-heading text-sm font-bold leading-tight text-primary sm:text-base">
            {SITE.shortName}
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-wider text-secondary sm:text-xs">
            Marine Supplies · Malta
          </span>
        </span>
      )}
    </>
  );
}
