import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export default function ProductCard({
  title,
  description,
  href,
  icon: Icon,
}: ProductCardProps) {
  return (
    <article className="card-industrial flex h-full flex-col p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-5 font-heading text-lg font-bold text-primary">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
        {description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent transition-colors hover:text-orange-600"
      >
        View range
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
