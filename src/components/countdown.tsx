"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/**
 * Counts down to `endsAt`. The clock is read only after mount, so the
 * prerendered HTML is stable and there is no hydration mismatch.
 */
export function Countdown({ endsAt }: { endsAt: string }) {
  const target = new Date(endsAt).getTime();
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (parts === null) {
    return <p className="font-display text-2xl text-ember">This offer has ended.</p>;
  }

  const cells: [string, number | undefined][] = [
    ["Days", parts?.days],
    ["Hours", parts?.hours],
    ["Minutes", parts?.minutes],
    ["Seconds", parts?.seconds],
  ];

  return (
    <div role="timer" aria-label="Time left in the offer" className="flex gap-2 sm:gap-3">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4.25rem] rounded-sm border border-bone/15 bg-ink/50 px-3 py-3 text-center backdrop-blur-md sm:min-w-[5.25rem]"
        >
          <span
            className="font-display block overflow-hidden text-3xl tabular-nums text-bone sm:text-4xl"
            aria-hidden={label === "Seconds"}
          >
            <span key={value ?? "x"} className={value === undefined ? "" : "tick"}>
              {value === undefined ? "--" : String(value).padStart(2, "0")}
            </span>
          </span>
          <span className="eyebrow mt-1 block text-[0.6rem] text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
