import type { Cell } from "../../types/cell";
import type { PaintMap } from "../../types/grid";
import GridCell from "./GridCell";

export type GridRendererProps = {
  cells: Cell[];
  paintMap: PaintMap;
  radius: number;
  onPaint: (cellId: string) => void;
  onStartPainting: () => void;
};

export function SquareGrid({
  cells,
  paintMap,
  radius,
  onPaint,
  onStartPainting,
}: GridRendererProps) {
  return (
    <g className="square-grid">
      {cells.map((cell) => (
        <GridCell
          key={cell.id}
          cell={cell}
          radius={radius}
          color={paintMap[cell.id]}
          onPaint={onPaint}
          onStartPainting={onStartPainting}
        />
      ))}
    </g>
  );
}

export default SquareGrid;
