import { describe, expect, it } from "vitest";
import type { GridConfig } from "../types/grid";
import { buildHoneycombGrid } from "./buildHoneycombGrid";
import { buildSquareGrid } from "./buildSquareGrid";
import { countColors } from "./countColors";
import { createGridSVG } from "./exportSVG";

const config: GridConfig = {
  type: "square",
  rows: 2,
  cols: 3,
  radius: 10,
  gap: 2,
};

describe("grid utilities", () => {
  it("builds square and staggered honeycomb layouts", () => {
    const square = buildSquareGrid(config);
    const honeycomb = buildHoneycombGrid({ ...config, type: "honeycomb" });

    expect(square).toHaveLength(6);
    expect(square[1]).toMatchObject({ x: 22, y: 0, row: 0, col: 1 });
    expect(honeycomb).toHaveLength(6);
    expect(honeycomb[3].x).toBe(11);
    expect(honeycomb[3].y).toBeGreaterThan(17);
  });

  it("counts painted colors and exports an SVG", () => {
    const cells = buildSquareGrid(config);
    const paintMap = { "0:0": "#ff0000", "0:1": null, "1:0": "#ff0000" };

    expect(countColors(paintMap)).toEqual({ "#ff0000": 2 });
    expect(createGridSVG(cells, paintMap, config)).toContain(
      '<circle cx="18" cy="18" r="9" fill="#ff0000"',
    );
  });
});
