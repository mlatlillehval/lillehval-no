export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex-1 pt-[calc(4rem+env(safe-area-inset-top,0px))]">
      {children}
    </div>
  );
}
