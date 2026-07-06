"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Live production telemetry — the site's signature element. A career
 * presented the way its owner presents software: status, region, local
 * time in the world's rarest UTC offset, and uptime since first deploy
 * (first day in industry). Every value is real.
 */
export default function Telemetry({ className = "" }: { className?: string }) {
  // Clock and uptime render only after mount: "now" doesn't exist on the server
  const [time, setTime] = useState<string | null>(null);
  const [uptimeDays, setUptimeDays] = useState<number | null>(null);

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

  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted ${className}`}
    >
      <span className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-strong opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-strong" />
        </span>
        {site.statusShort}
      </span>
      <span aria-hidden className="text-ink-faint">·</span>
      <span>Pokhara {site.coordinates}</span>
      <span aria-hidden className="text-ink-faint">·</span>
      <span className="tabular-nums">
        <span aria-hidden>{time ?? "--:--:--"}</span>
        <span className="sr-only">local time</span> UTC+5:45
      </span>
      <span aria-hidden className="text-ink-faint">·</span>
      <span className="tabular-nums">in production {uptimeDays ?? "—"} days</span>
    </p>
  );
}
