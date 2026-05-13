import { type BrandLogoKind, type BrandSurface, getBrandLogoSrc } from "../lib/brand";

type BrandLogoProps = {
  kind: BrandLogoKind;
  surface: BrandSurface;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "sync" | "async" | "auto";
};

export default function BrandLogo({
  kind,
  surface,
  alt,
  className,
  width = 240,
  height = 80,
  fetchPriority = "auto",
  decoding = "async",
}: BrandLogoProps) {
  return (
    <img
      src={getBrandLogoSrc(kind, surface)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      decoding={decoding}
      fetchPriority={fetchPriority}
    />
  );
}
