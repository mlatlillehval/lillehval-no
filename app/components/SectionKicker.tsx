type Props = {
  children: React.ReactNode;
  className?: string;
  /** Lys grønn tekst/linje på mørk bakgrunn (f.eks. prosjektside) */
  variant?: "default" | "onDark";
};

/**
 * Felles «undertittel» over seksjonshoder — grønn caps + diskret understrek.
 */
export default function SectionKicker({ children, className = "", variant = "default" }: Props) {
  const tone =
    variant === "onDark"
      ? "text-[#4ade80] border-b-2 border-[#4ade80]/35"
      : "text-[#15803d] border-b-2 border-[#15803d]/25";
  return (
    <span className={`inline-block mb-3 text-sm font-semibold uppercase tracking-[0.2em] pb-1 ${tone} ${className}`}>
      {children}
    </span>
  );
}
