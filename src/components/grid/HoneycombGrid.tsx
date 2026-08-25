import type { GridRendererProps } from "./SquareGrid";
import GridCell from "./GridCell";

export function HoneycombGrid({
  cells,
  paintMap,
  radius,
  onPaint,
  onStartPainting,
}: GridRendererProps) {
  return (
    <g className="honeycomb-grid">
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

export default HoneycombGrid;
