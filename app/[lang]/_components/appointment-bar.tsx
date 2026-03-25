"use client";

import { useEffect, useState } from "react";

interface AppointmentBarDict {
  cta_book: string;
  cta_call: string;
  phone: string;
}

export default function AppointmentBar({ dict }: { dict: AppointmentBarDict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAppointment = () => {
    window.dispatchEvent(new CustomEvent("open-appointment"));
  };

  return (
    <div
      className={`fixed bottom-2 inset-x-2 z-60 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <div className="flex gap-2 rounded-2xl bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-sm">
        <button
          onClick={openAppointment}
          className="flex-1 cursor-pointer rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          {dict.cta_book}
        </button>
        <a
          href={`tel:${dict.phone}`}
          className="flex-1 cursor-pointer rounded-xl border border-zinc-700 py-3 text-center text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-800"
        >
          {dict.cta_call}
        </a>
      </div>
    </div>
  );
}
