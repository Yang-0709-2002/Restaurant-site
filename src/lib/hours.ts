export type WeeklyHourRule = {
  weekdays: number[];
  open: string;
  close: string;
};

const weekdayNameToIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getBudapestWeekday(date: Date): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Budapest",
    weekday: "long",
  }).format(date);
  return weekdayNameToIndex[weekday] ?? 0;
}

function getBudapestMinutes(date: Date): number {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function parseHm(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

function ruleForWeekday(
  rules: WeeklyHourRule[],
  weekday: number,
): WeeklyHourRule | undefined {
  return rules.find((r) => r.weekdays.includes(weekday));
}

export function getOpenState(
  rules: WeeklyHourRule[],
  date = new Date(),
): { open: boolean; openStr: string; closeStr: string } {
  const wd = getBudapestWeekday(date);
  const rule = ruleForWeekday(rules, wd);
  if (!rule) {
    return { open: false, openStr: "", closeStr: "" };
  }
  const now = getBudapestMinutes(date);
  const start = parseHm(rule.open);
  const end = parseHm(rule.close);
  const open = now >= start && now <= end;
  return { open, openStr: rule.open, closeStr: rule.close };
}
