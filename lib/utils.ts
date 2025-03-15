import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormatNumberOption = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
};

export function formatNumber(
  value: number | string = "0.0",
  decimals?: FormatNumberOption
) {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping,
  } = decimals || {};
  const factor = Math.pow(10, maximumFractionDigits);
  const truncatedValue = Math.floor(Number(value) * factor) / factor;
  return truncatedValue.toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  });
}

const animalEmojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
];

export const getAvatarAttributes = (name: string) => {
  const index = name.length % animalEmojis.length;
  return {
    emoji: animalEmojis[index],
    color: `hsl(${name.length * 15}, 50%, 60%)`,
  };
};
