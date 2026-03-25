"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  image: string;
}

interface ServicesDict {
  title_line1: string;
  title_line2: string;
  items: ServiceItem[];
}

export default function Services({ dict }: { dict: ServicesDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-white px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16 max-w-xl"
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

        {/* Cards with images */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-500 cursor-default hover:shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />
                  {/* Gradient fade to white */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-lg shadow-sm backdrop-blur-sm">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-2">
                  <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
