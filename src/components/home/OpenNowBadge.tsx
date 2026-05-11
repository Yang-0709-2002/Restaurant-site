"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { WeeklyHourRule } from "@/lib/hours";
import { getOpenState } from "@/lib/hours";
import { cn } from "@/lib/cn";

type Props = {
  rules: WeeklyHourRule[];
};

export function OpenNowBadge({ rules }: Props) {
  const t = useTranslations("common");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const state = useMemo(
    () => getOpenState(rules, new Date()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rules, tick],
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        state.open
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          : "border-white/10 bg-white/5 text-zinc-400",
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          state.open ? "animate-pulse bg-emerald-400" : "bg-zinc-500",
        )}
      />
      <span>{state.open ? t("openNow") : t("closed")}</span>
      {state.openStr ? (
        <span className="font-normal normal-case text-zinc-400">
          · {state.openStr}–{state.closeStr}
        </span>
      ) : null}
    </div>
  );
}
