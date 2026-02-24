import { Cell } from "../types/cell";
import { GridConfig } from "../types/grid";

export function buildHoneycombGrid(config: GridConfig): Cell[] {
    const cells: Cell[] = [];

    // horizontal pitch between centers
    const pitch = config.radius * 2 + config.gap;

    // vertical step for hex packing is sin(60deg) * pitch (≈ 0.866 * pitch)
    // use a slightly tighter vertical spacing as requested
    const verticalStep = (Math.sqrt(3) / 2) * pitch * 0.92;

    for (let row = 0; row < config.rows; row++) {
        const xOffset = row % 2 === 0 ? 0 : pitch / 2;

        for (let col = 0; col < config.cols; col++) {
            const x = col * pitch + xOffset;
            const y = row * verticalStep;
            const id = `${row}:${col}`;

            cells.push({ id, x, y, row, col });
        }
    }

    return cells;
}