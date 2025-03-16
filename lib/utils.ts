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

function nameToHex(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

export const getAvatarAttributes = (name: string) => {
  const index = name.length % animalEmojis.length;
  return {
    emoji: animalEmojis[index],
    color: nameToHex(name),
  };
};
