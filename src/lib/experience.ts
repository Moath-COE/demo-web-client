export type ExperienceMode = "quick" | "relaxed";

export const EXPERIENCE_KEY = "sanad-experience";
export const DEFAULT_EXPERIENCE: ExperienceMode = "relaxed";

export const EXPERIENCE_OPTIONS: {
  value: ExperienceMode;
  title: string;
  desc: string;
}[] = [
  {
    value: "quick",
    title: "أنا مستعجل",
    desc: "يعطيني المختصر، يركز على الأهم، وينهي بسرعة.",
  },
  {
    value: "relaxed",
    title: "عندي وقت",
    desc: "يشرح بهدوء، يعطي أمثلة، ويتأكد أني فهمت.",
  },
];

export function getExperience(): ExperienceMode | null {
  if (typeof window === "undefined") return null;
  const v = sessionStorage.getItem(EXPERIENCE_KEY);
  return v === "quick" || v === "relaxed" ? v : null;
}

export function setExperience(value: ExperienceMode) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(EXPERIENCE_KEY, value);
}
