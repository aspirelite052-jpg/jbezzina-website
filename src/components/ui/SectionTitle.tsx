type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  id?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  id,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const maxWidth = align === "center" ? "max-w-3xl" : "max-w-2xl";

  return (
    <div className={`${alignClass} ${maxWidth}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-accent" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            light ? "text-slate-300" : "text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
