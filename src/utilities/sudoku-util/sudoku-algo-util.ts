import { SudokuAction, ActionState, SudokuCell, CellState } from "../../models/sudoky-model";

export function getSudokuActions (initialBoard: number[][]) {
	const initialBoardCpy = copyBoard(initialBoard);
	const actionsArray: SudokuAction[] = [];
	solveSudoku(actionsArray, initialBoardCpy);

	return actionsArray;
}

export function solveSudoku (actionsArray: SudokuAction[], board: number[][]) {
	const original = copyBoard(board);

	let row = 0,
		col = 0;
	let isValid = true;

	while (row < 9 && row >= 0) {
		while (col < 9 && col >= 0) {
			if (original[row][col] === 0) {
				isValid = fitValidNumber(board, row, col);
			}
			if (isValid) col++;
			else col--;
		}

		// After inner loop
		if (col < 0) {
			row--;
			col = 8;
		} else {
			row++;
			col = 0;
		}
	}
	return board;
}

function copyBoard (board: number[][]) {
	let newBoard = [];
	for (const row of board) {
		newBoard.push([ ...row ]);
	}
	return newBoard;
}

function fitValidNumber (board: number[][], row: number, col: number) {
	let currentNumber = board[row][col];
	let rowColValid = rowAndColAreValid(board, row, col, currentNumber);
	let squareValid = squareIsValid(board, row, col, currentNumber);
	while (!squareValid || (!rowColValid && currentNumber <= 9)) {
		currentNumber++;
		rowColValid = rowAndColAreValid(board, row, col, currentNumber);
		squareValid = squareIsValid(board, row, col, currentNumber);
	}

	const isValid = rowColValid && squareValid && currentNumber < 10;
	if (isValid) board[row][col] = currentNumber;
	else board[row][col] = 0;
	return isValid;
}

function squareIsValid (board: number[][], row: number, col: number, curr: number) {
	const rowStart = Math.floor(row / 3) * 3;
	const colStart = Math.floor(col / 3) * 3;

	for (let i = rowStart; i < rowStart + 3; i++) {
		for (let j = colStart; j < colStart + 3; j++) {
			if (board[i][j] === curr) return false;
		}
	}
	return true;
}

function rowAndColAreValid (board: number[][], row: number, col: number, curr: number) {
	const rowIsValid = !board[row].includes(curr);
	const colIsValid = board.filter((r) => r[col] === curr).length === 0;
	return rowIsValid && colIsValid;
}
