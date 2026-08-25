export type GridType = "square" | "honeycomb";

export type CellId = string;

export type PaintMap = Record<CellId, string | null>;

export type GridConfig = {
  type: GridType;
  rows: number;
  cols: number;
  radius: number;
  gap: number;
};
