import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A87C] border border-[rgba(201,168,124,0.2)] bg-[rgba(201,168,124,0.06)]",
        className
      )}
    >
      {children}
    </span>
  );
}
