"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ContactMapDict {
  address: string;
  mapsEmbedUrl: string;
  mapTitle: string;
}

interface ContactDict {
  title_line1: string;
  title_line2: string;
  body: string;
  book_cta: string;
  call_cta: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  map_link: string;
  map: ContactMapDict;
}

export default function Contact({ dict }: { dict: ContactDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const openAppointment = () => {
    window.dispatchEvent(new Event("open-appointment"));
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-zinc-50 px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            {dict.title_line1}
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            {dict.title_line2}
          </h2>
        </motion.div>

        {/* Three-column layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Column 1 — Contact info */}
          <motion.div
            className="flex flex-col gap-5 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm lg:p-8"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm leading-relaxed text-zinc-500">{dict.body}</p>

            {/* Phone */}
            <a
              href={`tel:${dict.phone}`}
              className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-teal-50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 transition-colors group-hover:bg-teal-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-700">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.4 2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">{dict.phone}</div>
                <div className="text-xs text-zinc-400">{dict.hours}</div>
              </div>
            </a>

            {/* Address */}
            <a
              href={dict.map_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-teal-50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 transition-colors group-hover:bg-teal-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-700">
                  <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">{dict.address}</div>
                <div className="text-xs text-zinc-400">Oeiras</div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${dict.email}`}
              className="group flex items-center gap-4 rounded-xl p-3 -mx-3 transition-colors hover:bg-teal-50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 transition-colors group-hover:bg-teal-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-700">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">{dict.email}</div>
              </div>
            </a>
          </motion.div>

          {/* Column 2 — Appointment invitation card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="flex h-full flex-col justify-between p-8 lg:p-10"
              style={{ background: "linear-gradient(160deg, #f0fdfa 0%, #ccfbf1 50%, #fef3c7 100%)" }}
            >
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm">
                  🐾
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  {dict.book_cta}?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {dict.body}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={openAppointment}
                  className="cursor-pointer w-full rounded-full bg-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {dict.book_cta}
                </button>
                <a
                  href={`tel:${dict.phone}`}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-zinc-200 bg-white/80 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-teal-200 hover:text-teal-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.1 3.4 2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                  </svg>
                  {dict.call_cta}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 3 — Map */}
          <motion.div
            className="overflow-hidden rounded-2xl border border-zinc-100 shadow-sm"
            style={{ minHeight: "380px" }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src={dict.map.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={dict.map.mapTitle}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
