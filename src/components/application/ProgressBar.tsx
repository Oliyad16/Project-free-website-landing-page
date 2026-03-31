"use client";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="px-6 pt-5 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-[#9A8B7A] tracking-widest uppercase">
          Step {step} of {totalSteps}
        </span>
        <span className="text-xs font-mono text-[#C9A87C]">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-[rgba(201,168,124,0.12)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #C9A87C 0%, #4A6DB5 100%)",
          }}
        />
      </div>
    </div>
  );
}
