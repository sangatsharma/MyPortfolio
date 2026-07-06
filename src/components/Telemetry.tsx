"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Clock, MapPin } from "lucide-react";
import { site } from "@/data/site";

interface Reading {
  detail: string;
  href?: string;
  external?: boolean;
}

/**
 * Live production telemetry — the site's signature element. A career
 * presented the way its owner presents software: status, region, local
 * time in the world's rarest UTC offset, and uptime since first deploy
 * (first day in industry). Every value is real. Hovering a chip prints
 * its explanation on a single shared readout line below the row — one
 * slot, so explanations can never stack on each other.
 */
export default function Telemetry({ className = "" }: { className?: string }) {
  // Clock and uptime render only after mount: "now" doesn't exist on the server
  const [time, setTime] = useState<string | null>(null);
  const [uptimeDays, setUptimeDays] = useState<number | null>(null);
  const [readout, setReadout] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => {
      const now = new Date();
      setTime(fmt.format(now));
      setUptimeDays(
        Math.floor((now.getTime() - new Date(site.careerStart).getTime()) / 86_400_000),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const segment = (reading: Reading) => ({
    ...reading,
    onShow: () => setReadout(reading.detail),
    onHide: () => setReadout(null),
  });

  return (
    <div className={className}>
      <div className="flex max-w-full flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        <Segment
          {...segment({ detail: "senior frontend · full-stack", href: "#contact" })}
          label={site.statusShort}
          icon={
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-strong opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-strong" />
            </span>
          }
        />
        <Segment
          {...segment({
            detail: site.coordinates,
            href: "https://maps.google.com/?q=Pokhara,Nepal",
            external: true,
          })}
          label="Pokhara"
          icon={<MapPin size={11} aria-hidden className="text-accent-strong" />}
        />
        <Segment
          {...segment({ detail: "utc+5:45 · rarest offset on earth" })}
          label={
            <span className="tabular-nums">
              <span aria-hidden>{time ?? "--:--:--"}</span>
              <span className="sr-only">local time</span>
            </span>
          }
          icon={<Clock size={11} aria-hidden className="text-accent-strong" />}
        />
        <Segment
          {...segment({ detail: "uptime since first deploy, nov 2024", href: "#experience" })}
          label={<span className="tabular-nums">{uptimeDays ?? "—"} days in production</span>}
          icon={<Activity size={11} aria-hidden className="text-accent-strong" />}
        />
      </div>

      {/* Shared readout — height is reserved so the hero never shifts */}
      <div aria-hidden className="mt-2.5 h-4 overflow-hidden pl-1">
        <AnimatePresence mode="wait">
          {readout && (
            <motion.p
              key={readout}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-strong"
            >
              ▸ {readout}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** One reading on the instrument: an icon + value chip wired to the shared readout. */
function Segment({
  icon,
  label,
  detail,
  href,
  external,
  onShow,
  onHide,
}: Reading & {
  icon: React.ReactNode;
  label: React.ReactNode;
  onShow: () => void;
  onHide: () => void;
}) {
  const content = (
    <>
      {icon}
      <span className="whitespace-nowrap">{label}</span>
      <span className="sr-only">{detail}</span>
    </>
  );
  const shared =
    "flex items-center gap-2 rounded-full border border-line bg-base-soft/80 px-3.5 py-2 shadow-card backdrop-blur-sm transition-colors duration-200 hover:border-accent/50 hover:text-ink";
  const handlers = {
    onMouseEnter: onShow,
    onMouseLeave: onHide,
    onFocus: onShow,
    onBlur: onHide,
  };

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...handlers}
        className={shared}
      >
        {content}
      </a>
    );
  }
  return (
    <span tabIndex={0} {...handlers} className={shared}>
      {content}
    </span>
  );
}
