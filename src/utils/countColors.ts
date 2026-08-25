import type { PaintMap } from "../types/grid";

export function countColors(paintMap: PaintMap): Record<string, number> {
  return Object.values(paintMap).reduce<Record<string, number>>(
    (counts, color) => {
      if (color) counts[color] = (counts[color] ?? 0) + 1;
      return counts;
    },
    {},
  );
}

export default countColors;
