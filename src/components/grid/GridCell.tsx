import type { KeyboardEvent, PointerEvent } from "react";
import type { Cell } from "../../types/cell";

type GridCellProps = {
  cell: Cell;
  radius: number;
  color: string | null | undefined;
  onPaint: (cellId: string) => void;
  onStartPainting: () => void;
};

export function GridCell({
  cell,
  radius,
  color,
  onPaint,
  onStartPainting,
}: GridCellProps) {
  const paint = (event: PointerEvent<SVGCircleElement>) => {
    event.preventDefault();
    onStartPainting();
    onPaint(cell.id);
  };

  const paintWithKeyboard = (event: KeyboardEvent<SVGCircleElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onPaint(cell.id);
    }
  };

  return (
    <circle
      className={`grid-cell${color ? " painted" : ""}`}
      cx={cell.x}
      cy={cell.y}
      r={Math.max(2, radius - 1)}
      fill={color ?? "#ffffff"}
      data-cell-id={cell.id}
      role="button"
      tabIndex={0}
      aria-label={`Stone at row ${cell.row + 1}, column ${cell.col + 1}${
        color ? `, ${color}` : ", empty"
      }`}
      onPointerDown={paint}
      onKeyDown={paintWithKeyboard}
    />
  );
}

export default GridCell;
