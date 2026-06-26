import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

type CTASectionProps = {
  headline?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CTASection({
  headline = "Need Industrial Supplies?",
  description = "Contact our Marsa team for quotes, stock enquiries, and technical supply support for your workshop or site.",
  buttonLabel = "Request a Quote",
  buttonHref = "/quote",
}: CTASectionProps) {
  return (
    <section className="section-padding bg-primary" aria-labelledby="cta-heading">
      <div className="container-industrial">
        <div className="flex flex-col items-start justify-between gap-8 rounded-sm border border-slate-700 bg-slate-900/50 p-8 md:flex-row md:items-center md:p-12 lg:p-14">
          <SectionTitle
            id="cta-heading"
            title={headline}
            description={description}
            light
          />
          <Link href={buttonHref} className="btn-primary shrink-0">
            {buttonLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
