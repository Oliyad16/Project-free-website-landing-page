"use client";

import { motion } from "framer-motion";

/**
 * A single continuous flowing path stream that runs the full height of the page.
 * Paths are tall SVG curves — not section-bound — so they scroll through everything.
 */
function FlowingStream({ offset }: { offset: number }) {
  // 28 curves per stream, each slightly offset horizontally and vertically
  const paths = Array.from({ length: 28 }, (_, i) => {
    const xBase = 50 + offset + i * 14;
    const amplitude = 120 + i * 18;
    const shift = offset * 0.6;

    return {
      id: i,
      // Tall bezier that spans the full height (0 to 4000 in viewBox units)
      d: `M${xBase + shift} 0
          C${xBase + amplitude + shift} 600,
           ${xBase - amplitude + shift} 1200,
           ${xBase + amplitude * 0.6 + shift} 2000
          C${xBase - amplitude * 0.8 + shift} 2800,
           ${xBase + amplitude + shift} 3400,
           ${xBase - amplitude * 0.4 + shift} 4000`,
      opacity: 0.035 + i * 0.006,
      width: 0.6 + i * 0.04,
      duration: 18 + i * 1.2,
    };
  });

  return (
    <>
      {paths.map((p) => (
        <motion.path
          key={p.id}
          d={p.d}
          stroke="#C9A87C"
          strokeWidth={p.width}
          strokeOpacity={p.opacity}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0.4, 1, 0.4],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.id * 0.3,
          }}
        />
      ))}
    </>
  );
}

/**
 * Renders the full-page continuous path background.
 * Place this as `position: fixed` so it covers the entire viewport while scrolling,
 * giving the illusion the streams flow through every section.
 */
export function BackgroundPaths() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 4000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Left stream */}
        <FlowingStream offset={-320} />
        {/* Right stream (mirrored by positive offset) */}
        <FlowingStream offset={320} />
        {/* Centre accent — fewer, broader curves */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 380 + (i - 4) * 22;
          return (
            <motion.path
              key={`c-${i}`}
              d={`M${x} 0 C${x + 200} 800, ${x - 200} 1600, ${x + 100} 2400 C${x - 180} 3200, ${x + 220} 3700, ${x} 4000`}
              stroke="#2B4A8F"
              strokeWidth={0.5 + i * 0.05}
              strokeOpacity={0.025 + i * 0.004}
              fill="none"
              initial={{ pathLength: 0.3 }}
              animate={{
                pathOffset: [0, 1, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 28 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
