// SVG container
import { useRef, type PointerEvent } from "react";
import type { Cell } from "../../types/cell";
import type { GridConfig, PaintMap } from "../../types/grid";
import HoneycombGrid from "./HoneycombGrid";
import SquareGrid from "./SquareGrid";

type GridCanvasProps = {
  cells: Cell[];
  config: GridConfig;
  paintMap: PaintMap;
  onPaint: (cellId: string) => void;
};

export function GridCanvas({
  cells,
  config,
  paintMap,
  onPaint,
}: GridCanvasProps) {
  const painting = useRef(false);
  const padding = 12;
  const maxX = Math.max(...cells.map((cell) => cell.x), 0);
  const maxY = Math.max(...cells.map((cell) => cell.y), 0);
  const edge = config.radius + padding;
  const viewBox = `${-edge} ${-edge} ${maxX + edge * 2} ${
    maxY + edge * 2
  }`;

  const stopPainting = () => {
    painting.current = false;
  };

  const continuePainting = (event: PointerEvent<SVGSVGElement>) => {
    if (!painting.current) return;
    const target = event.target as Element;
    const cellId = target.getAttribute("data-cell-id");
    if (cellId) onPaint(cellId);
  };

  const rendererProps = {
    cells,
    paintMap,
    radius: config.radius,
    onPaint,
    onStartPainting: () => {
      painting.current = true;
    },
  };

  return (
    <div className="canvas-wrap">
      <svg
        className="grid-canvas"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-label={`${config.rows} by ${config.cols} ${config.type} rhinestone grid`}
        onPointerMove={continuePainting}
        onPointerUp={stopPainting}
        onPointerCancel={stopPainting}
        onPointerLeave={stopPainting}
      >
        {config.type === "honeycomb" ? (
          <HoneycombGrid {...rendererProps} />
        ) : (
          <SquareGrid {...rendererProps} />
        )}
      </svg>
    </div>
  );
}

export default GridCanvas;
