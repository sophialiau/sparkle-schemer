import type { Cell } from "../types/cell";
import type { GridConfig, PaintMap } from "../types/grid";

export function createGridSVG(
  cells: Cell[],
  paintMap: PaintMap,
  config: GridConfig,
): string {
  const padding = 8;
  const maxX = Math.max(...cells.map((cell) => cell.x), 0);
  const maxY = Math.max(...cells.map((cell) => cell.y), 0);
  const edge = config.radius + padding;
  const width = maxX + edge * 2;
  const height = maxY + edge * 2;
  const circles = cells
    .map(
      (cell) =>
        `  <circle cx="${cell.x + edge}" cy="${cell.y + edge}" r="${
          config.radius - 1
        }" fill="${paintMap[cell.id] ?? "#ffffff"}" stroke="#9c9082" stroke-width="1" />`,
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    '  <rect width="100%" height="100%" fill="#f2eadb" />',
    circles,
    "</svg>",
  ].join("\n");
}

export function downloadGridSVG(
  cells: Cell[],
  paintMap: PaintMap,
  config: GridConfig,
) {
  const blob = new Blob([createGridSVG(cells, paintMap, config)], {
    type: "image/svg+xml",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sparkle-scheme.svg";
  link.click();
  URL.revokeObjectURL(url);
}
