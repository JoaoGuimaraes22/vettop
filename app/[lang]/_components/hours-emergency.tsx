"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ScheduleItem {
  day: string;
  hours: string;
}

interface HoursEmergencyDict {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  hours_label: string;
  emergency_label: string;
  emergency_text: string;
  emergency_phone: string;
  emergency_cta: string;
  schedule: ScheduleItem[];
}

export default function HoursEmergency({ dict }: { dict: HoursEmergencyDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="hours"
      ref={ref}
      className="bg-teal-50 px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div className="mb-12" {...fadeUp(0)}>
          <h2 className="font-black uppercase leading-none tracking-tight text-4xl sm:text-5xl md:text-6xl">
            <span className="block text-zinc-900">{dict.title_line1}</span>
            <span className="block text-teal-200">{dict.title_line2}</span>
          </h2>
          {dict.subtitle && (
            <p className="mt-4 text-sm text-zinc-500 max-w-lg">{dict.subtitle}</p>
          )}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hours table */}
          <motion.div
            className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm"
            {...fadeUp(0.1)}
          >
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-600">
              {dict.hours_label}
            </h3>
            <div className="divide-y divide-zinc-100">
              {dict.schedule.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-zinc-700">{item.day}</span>
                  <span className="text-sm text-zinc-500">{item.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency card */}
          <motion.div
            className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm flex flex-col justify-center"
            {...fadeUp(0.2)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-red-600">
                {dict.emergency_label}
              </h3>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-red-800/70">
              {dict.emergency_text}
            </p>
            <a
              href={`tel:${dict.emergency_phone}`}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.4 2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
              </svg>
              {dict.emergency_cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
