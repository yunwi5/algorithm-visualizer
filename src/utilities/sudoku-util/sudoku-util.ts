import { SudokuCell, CellState } from "../../models/sudoku-model";

export function createCustomGrid (grid: number[][]) {
	const gridCells: SudokuCell[][] = [];

	for (const row of grid) {
		const rowCells: SudokuCell[] = [];

		for (const value of row) {
			let cell;
			if (value === 0) cell = { value, status: CellState.INITIAL };
			else cell = { value, status: CellState.FIXED };
			rowCells.push(cell);
		}
		gridCells.push(rowCells);
	}

	return gridCells;
}

export function printGrid (grid: SudokuCell[][]) {
	for (const row of grid) {
		const formattedRow = row.map((cell) => `${cell.value} (${cell.status})`);
		const line = formattedRow.join(" | ");
		console.log(line);
	}
}

// Sudoku Overall validation
export function sudokuIsSolved (grid: SudokuCell[][]): boolean {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.status === CellState.INITIAL || cell.status === CellState.INVALID) {
				return false;
			}
		}
	}

	return true;
}

// Sudoku Cell Validation
export function cellIsValid (grid: SudokuCell[][], row: number, col: number, curr: number) {
	const validSquare = squareIsValid(grid, row, col, curr);
	const validRowAndCol = rowAndColAreValid(grid, row, col, curr);
	// console.log(`valid square: ${validSquare}, valid row & col: ${validRowAndCol}`);
	const isValid = validSquare && validRowAndCol;
	// console.log("is valid:", isValid);
	return isValid;
}

function squareIsValid (board: SudokuCell[][], row: number, col: number, curr: number) {
	const rowStart = Math.floor(row / 3) * 3;
	const colStart = Math.floor(col / 3) * 3;

	for (let i = rowStart; i < rowStart + 3; i++) {
		for (let j = colStart; j < colStart + 3; j++) {
			if (board[i][j].value === curr) return false;
		}
	}
	return true;
}

function rowAndColAreValid (board: SudokuCell[][], row: number, col: number, curr: number) {
	const rowIsValid = board[row].filter((cell) => cell.value === curr).length === 0;
	const colIsValid = board.filter((r) => r[col].value === curr).length === 0;
	return rowIsValid && colIsValid;
}
