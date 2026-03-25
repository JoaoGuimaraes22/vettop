"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface Stat {
  value: string;
  label: string;
}

interface HeroDict {
  title_line1: string;
  title_line2: string;
  tagline: string;
  cta: string;
  cta_secondary: string;
  stats: Stat[];
}

function PawParticle({
  delay,
  duration,
  left,
  size,
  hidden,
}: {
  delay: number;
  duration: number;
  left: string;
  size: number;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <div
      className="absolute pointer-events-none text-teal-600/10"
      style={{
        left,
        bottom: "10%",
        fontSize: `${size}px`,
        animation: `paw-float ${duration}s ease-out ${delay}s infinite`,
      }}
    >
      🐾
    </div>
  );
}

export default function Hero({ dict }: { dict: HeroDict }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedRaw = useReducedMotion();
  const prefersReduced = mounted ? (prefersReducedRaw ?? false) : false;

  const { scrollY } = useScroll();
  const statsY = useTransform(scrollY, [0, 600], [0, -40]);
  const blobScale = useTransform(scrollY, [0, 400], [1, 1.08]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setVisible(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(165deg, #f0fdfa 0%, #fafaf7 40%, #fefce8 100%)" }}
    >
      {/* Subtle paw particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawParticle delay={0} duration={6} left="5%" size={20} hidden={prefersReduced} />
        <PawParticle delay={2} duration={7} left="20%" size={16} hidden={prefersReduced} />
        <PawParticle delay={1} duration={5.5} left="80%" size={22} hidden={prefersReduced} />
        <PawParticle delay={3.5} duration={6.5} left="92%" size={14} hidden={prefersReduced} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 md:px-8 xl:px-16">
        <div className="grid lg:min-h-screen items-start lg:items-center gap-4 lg:grid-cols-2 lg:gap-12 overflow-hidden">
          {/* Left — text content */}
          <div className="pt-24 pb-8 lg:py-32">
            <div
              style={
                visible
                  ? { animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }
                  : { opacity: 0 }
              }
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-800 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Oeiras, Portugal
              </span>
            </div>

            <h1
              className="mt-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl"
              style={
                visible
                  ? { animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both" }
                  : { opacity: 0 }
              }
            >
              {dict.title_line1}
              <br />
              <span className="text-teal-600">{dict.title_line2}</span>
            </h1>

            <p
              className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500"
              style={
                visible
                  ? { animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }
                  : { opacity: 0 }
              }
            >
              {dict.tagline}
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              style={
                visible
                  ? { animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both" }
                  : { opacity: 0 }
              }
            >
              <button
                onClick={() => scrollTo("contact")}
                className="cursor-pointer rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-teal-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {dict.cta}
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="cursor-pointer rounded-full border-2 border-zinc-200 px-8 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50"
              >
                {dict.cta_secondary}
              </button>
            </div>
          </div>

          {/* Right — organic image composition */}
          <div
            className="relative flex items-center justify-center"
            style={
              visible
                ? { animation: "scale-in 1s cubic-bezier(0.16,1,0.3,1) 0.3s both" }
                : { opacity: 0 }
            }
          >
            {/* Animated blob background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={prefersReduced ? {} : { scale: blobScale }}
            >
              <div
                className="h-56 w-56 bg-gradient-to-br from-teal-200/60 via-teal-100/40 to-amber-100/30 sm:h-80 sm:w-80 lg:h-[34rem] lg:w-[34rem]"
                style={{
                  animation: prefersReduced ? undefined : "blob-morph 12s ease-in-out infinite",
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                }}
              />
            </motion.div>

            {/* Overlapping circular images */}
            <div className="relative h-56 w-56 sm:h-80 sm:w-80 lg:h-[32rem] lg:w-[32rem]">
              {/* Main large circle */}
              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-[55%] -translate-y-[55%] overflow-hidden rounded-full ring-4 ring-white shadow-2xl sm:h-52 sm:w-52 lg:h-[22rem] lg:w-[22rem]">
                <Image
                  src="/gallery/1.jpg"
                  alt="Veterinarian with pet"
                  fill
                  sizes="(min-width: 640px) 256px, 208px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Secondary circle */}
              <div className="absolute right-0 top-1/2 h-24 w-24 -translate-y-[30%] overflow-hidden rounded-full ring-4 ring-white shadow-xl sm:h-36 sm:w-36 lg:h-52 lg:w-52">
                <Image
                  src="/gallery/2.jpg"
                  alt="Happy pet"
                  fill
                  sizes="(min-width: 640px) 176px, 144px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Small accent circle */}
              <div className="absolute bottom-6 left-8 h-16 w-16 overflow-hidden rounded-full ring-4 ring-white shadow-lg sm:h-24 sm:w-24 lg:bottom-8 lg:left-8 lg:h-40 lg:w-40">
                <Image
                  src="/gallery/3.jpg"
                  alt="Clinic interior"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stats card — inline on mobile, absolute on lg */}
      {dict.stats.length > 0 && (
        <motion.div
          className="relative z-20 mx-auto w-[calc(100%-3rem)] max-w-2xl pb-8 lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 lg:pb-0"
          style={prefersReduced ? {} : { y: statsY }}
        >
          <div
            className="flex items-center justify-around rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-4 shadow-xl backdrop-blur-md sm:px-6 sm:py-5"
            style={
              visible
                ? { animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both" }
                : { opacity: 0 }
            }
          >
            {dict.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-zinc-900 sm:text-3xl">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-medium tracking-wider text-zinc-400 uppercase sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 lg:flex"
        style={
          visible
            ? { animation: "fade-in 1s cubic-bezier(0.16,1,0.3,1) 1s both" }
            : { opacity: 0 }
        }
      >
        <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-zinc-300">
          <div
            className="absolute top-0 h-4 w-full bg-teal-500"
            style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
