import { Cell } from "../types/cell";
import { GridConfig } from "../types/grid";

export function buildSquareGrid(config: GridConfig): Cell[] {
	const cells: Cell[] = [];
	const pitch = config.radius * 2 + config.gap;

	for (let row = 0; row < config.rows; row++) {
		for (let col = 0; col < config.cols; col++) {
			const x = col * pitch;
			const y = row * pitch;
			const id = `${row}:${col}`;

			cells.push({ id, x, y, row, col });
		}
	}

	return cells;
}