"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  image: string;
}

interface TeamDict {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  members: TeamMember[];
}

export default function Team({ dict }: { dict: TeamDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const lead = dict.members[0];
  const rest = dict.members.slice(1);

  return (
    <section
      id="team"
      ref={ref}
      className="relative bg-zinc-50 px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32 noise-texture"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16"
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
          {dict.subtitle && (
            <p className="mt-4 max-w-lg text-base text-zinc-500 leading-relaxed">{dict.subtitle}</p>
          )}
        </motion.div>

        {/* Lead vet — editorial hero treatment */}
        {lead && (
          <motion.div
            className="mb-12 grid items-center gap-8 lg:grid-cols-5 lg:gap-12"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Large photo — takes 3 cols */}
            <div className="group relative lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-teal-100 shadow-lg">
                <Image
                  src={lead.image}
                  alt={lead.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating specialization badge */}
              <div className="absolute -bottom-4 left-6 rounded-full bg-white px-5 py-2 text-xs font-semibold text-teal-700 shadow-lg ring-1 ring-zinc-100">
                {lead.specialization}
              </div>
            </div>

            {/* Name + info — takes 2 cols */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-teal-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-600">
                  {lead.role}
                </span>
              </div>
              <h3 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                {lead.name}
              </h3>
              <div className="mt-4 h-1 w-12 rounded-full bg-teal-200" />
            </div>
          </motion.div>
        )}

        {/* Rest of team — horizontal row with larger photos */}
        <div className="grid gap-6 sm:grid-cols-3">
          {rest.map((member, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Photo with hover overlay */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-teal-50 shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Hover overlay with specialization */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {member.specialization}
                    </span>
                  </div>
                </div>
              </div>
              {/* Name + role below */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-zinc-900">{member.name}</h3>
                <p className="mt-0.5 text-xs text-zinc-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
