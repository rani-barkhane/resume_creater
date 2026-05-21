"use client";

import type { ReactNode } from "react";

const GOLD_FALLBACK = "#A68946";

export function ProGoldBullets({
  bullets,
  color = GOLD_FALLBACK,
}: {
  bullets: string[];
  color?: string;
}) {
  if (!bullets.length) return null;
  return (
    <ul className="mt-2 space-y-1.5">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="flex gap-2.5 text-[12.5px] text-slate-700 leading-[1.55] font-serif"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
            style={{ backgroundColor: color }}
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProTimelineBlock({
  title,
  subtitle,
  date,
  gold = GOLD_FALLBACK,
  children,
}: {
  title: string;
  subtitle?: string;
  date?: string;
  gold?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative pl-5 mb-1">
      <span
        className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
        style={{ backgroundColor: gold }}
      />
      <span
        className="absolute left-[3px] top-4 bottom-0 w-px"
        style={{ backgroundColor: `${gold}55` }}
      />
      <div className="flex justify-between items-baseline gap-3">
        <p className="font-semibold text-[13px] text-slate-800 font-serif">
          {title}
        </p>
        {date && (
          <p className="text-[12px] italic text-slate-500 shrink-0 font-serif">
            {date}
          </p>
        )}
      </div>
      {subtitle && (
        <p
          className="text-[12px] mt-0.5 font-medium font-serif"
          style={{ color: gold }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export function parseSummaryParts(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
