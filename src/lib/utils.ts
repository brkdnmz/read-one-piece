import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
import { FIRST_CHAPTER_PAGES, MAX_PAGES_PER_CHAPTER } from "@/constants";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function getMaxPagesForChapter(chapter: number) {
  return chapter === 1 ? FIRST_CHAPTER_PAGES : MAX_PAGES_PER_CHAPTER;
}

// Svelte's fly transition uses this easing
export function cubicOut(t: number) {
  return 1 - (1 - t) ** 3;
}
