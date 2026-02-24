// will hold the types related to cells

// Cell

import { CellId } from "./grid";

export type Cell = {
  id: CellId;
  x: number;
  y: number;
  row: number;
  col: number;
};