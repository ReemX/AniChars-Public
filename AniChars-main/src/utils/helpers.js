import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args) => {
  return twMerge(clsx(args));
};

export const scrollbar = ({
  thick = true,
  roundThumb = true,
  roundTrack = false,
} = {}) => {
  const thickness = thick ? "scrollbar" : "scrollbar-thin";
  const roundedThumb = roundThumb
    ? "scrollbar-thumb-rounded-md"
    : "scrollbar-thumb-rounded-none";
  const roundedTrack = roundTrack
    ? "scrollbar-track-rounded-md"
    : "scrollbar-track-rounded-none";
  return ` scrollbar-track-gray-200 dark:scrollbar-track-gray-800 scrollbar-thumb-indigo-600 dark:scrollbar-thumb-blue-900 ${thickness} ${roundedThumb} ${roundedTrack}`;
};
