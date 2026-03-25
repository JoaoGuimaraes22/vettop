"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

interface PricingDict {
  title_line1: string;
  title_line2: string;
  subtitle: string;
  popular_label: string;
  cta: string;
  disclaimer: string;
  plans: Plan[];
}

const fadeUp = (inView: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const PLAN_PETS = ["🐕", "🐾", "🐈"];

export default function Pricing({ dict }: { dict: PricingDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp(inView)}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            {dict.title_line1}
          </h2>
          <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {dict.title_line2}
          </p>
          {dict.subtitle && <p className="mt-3 max-w-xl text-neutral-600">{dict.subtitle}</p>}
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fadeUp(inView, 0.1 + i * 0.1)}
              className={[
                "relative flex flex-col rounded-2xl border p-8 transition-shadow duration-300",
                plan.popular
                  ? "border-teal-600 bg-teal-50 shadow-lg"
                  : "border-neutral-200 bg-white hover:shadow-md",
              ].join(" ")}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {dict.popular_label}
                </span>
              )}

              {/* Decorative pet emoji */}
              <span className={`absolute top-5 right-5 text-2xl opacity-15 ${plan.popular ? "opacity-20" : ""}`}>
                {PLAN_PETS[i % PLAN_PETS.length]}
              </span>

              <div
                className={[
                  "mb-1 text-xs font-bold uppercase tracking-widest",
                  plan.popular ? "text-teal-600" : "text-neutral-500",
                ].join(" ")}
              >
                {plan.name}
              </div>
              <div className="mb-1 text-4xl font-bold tracking-tight text-neutral-900">
                {plan.price}
              </div>
              <div className="mb-6 text-sm text-neutral-500">{plan.period}</div>

              <ul className="mb-8 flex flex-col gap-2.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-neutral-600">
                    <span className="mt-0.5 shrink-0 font-bold text-teal-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={[
                  "mt-auto block cursor-pointer rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200",
                  plan.popular
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "border border-teal-600 text-teal-600 hover:bg-teal-50",
                ].join(" ")}
              >
                {dict.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {dict.disclaimer && (
          <motion.p {...fadeUp(inView, 0.4)} className="mt-8 text-center text-sm text-neutral-400">
            {dict.disclaimer}
          </motion.p>
        )}
      </div>
    </section>
  );
}
