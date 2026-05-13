export default function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10 flex-1 pt-16">{children}</div>;
}
