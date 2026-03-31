"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode as React.RefObject<HTMLElement>
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-3">
          {slides.map((slideContent, index) => (
            <div
              className="flex-[0_0_80%] sm:flex-[0_0_72%] pl-3 transform-gpu"
              key={index}
            >
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex mx-auto max-w-xs justify-between items-center gap-4 mt-6">
        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={`w-2.5 h-2.5 rounded-full border border-[rgba(201,168,124,0.4)] transition-all duration-200 ${
                index === selectedIndex
                  ? "bg-[#C9A87C] scale-110"
                  : "bg-transparent hover:bg-[rgba(201,168,124,0.3)]"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          className={`rounded-full border border-[rgba(201,168,124,0.2)] bg-[rgba(201,168,124,0.06)] relative h-1.5 flex-1 max-w-[120px] overflow-hidden transition-opacity duration-300 ${
            showAutoplayProgress ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="bg-[#C9A87C] absolute top-0 bottom-0 -left-full w-full"
            ref={progressNode}
            style={{
              animationName: showAutoplayProgress ? "autoplay-progress" : "none",
              animationTimingFunction: "linear",
              animationIterationCount: "1",
              animationPlayState: showAutoplayProgress ? "running" : "paused",
            }}
          />
        </div>

        {/* Play/Pause */}
        <button
          onClick={toggleAutoplay}
          type="button"
          className="size-8 rounded-full border border-[rgba(201,168,124,0.25)] bg-[rgba(201,168,124,0.06)] flex items-center justify-center text-[#C9A87C] hover:bg-[rgba(201,168,124,0.12)] transition-colors"
        >
          {autoplayIsPlaying ? (
            <Pause className="size-3.5" fill="currentColor" />
          ) : (
            <Play className="size-3.5" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
};

// ── Hooks ──────────────────────────────────────────────────────────────────────

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

type UseAutoplayProgressType = { showAutoplayProgress: boolean };

export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback((timeUntilNext: number | null) => {
    const node = progressNode.current;
    if (!node || timeUntilNext === null) return;

    if (!animationName.current) {
      animationName.current =
        window.getComputedStyle(node).animationName || "autoplay-progress";
    }

    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = "autoplay-progress";
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    setShowAutoplayProgress(true);
  }, [progressNode]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi, startProgress]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return { showAutoplayProgress };
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;
      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick };
};

// ── Sub-components ─────────────────────────────────────────────────────────────

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const DotButton: React.FC<PropTypeButton> = ({ children, ...restProps }) => (
  <button type="button" {...restProps}>{children}</button>
);

export { Carousel };
