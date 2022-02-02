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

export function createSolutionGrid (grid: number[][]) {
	const solutionGrid: SudokuCell[][] = [];

	for (const row of grid) {
		const rowCells: SudokuCell[] = [];

		for (const value of row) {
			let cell = { value, status: CellState.FINAL_VALID };
			rowCells.push(cell);
		}
		solutionGrid.push(rowCells);
	}

	return solutionGrid;
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
	if (!(curr > 0 && curr < 10)) {
		return {
			isValid: false,
			errMessages: [ "Value out of range" ]
		};
	}

	const validSquare = squareIsValid(grid, row, col, curr);
	const rowValid = rowIsValid(grid, row, col, curr);
	const colValid = colIsValid(grid, row, col, curr);
	const isValid = validSquare && rowValid && colValid;

	let errMessages: string[] = [];
	if (!validSquare) errMessages.push("3x3 square is not valid");
	if (!rowValid) errMessages.push("Row is not valid");
	if (!colValid) errMessages.push("Column is not valid");

	return {
		isValid,
		errMessages
	};
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

// function rowAndColAreValid (board: SudokuCell[][], row: number, col: number, curr: number) {
// 	const rowIsValid = board[row].filter((cell) => cell.value === curr).length === 0;
// 	const colIsValid = board.filter((r) => r[col].value === curr).length === 0;
// 	return rowIsValid && colIsValid;
// }

function rowIsValid (board: SudokuCell[][], row: number, col: number, curr: number) {
	return board[row].filter((cell) => cell.value === curr).length === 0;
}

function colIsValid (board: SudokuCell[][], row: number, col: number, curr: number) {
	return board.filter((r) => r[col].value === curr).length === 0;
}
