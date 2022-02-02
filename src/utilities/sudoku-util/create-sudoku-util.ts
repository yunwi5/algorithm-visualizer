import { getRandomNumber } from "../calc-util";
import { squareIsValid, rowAndColAreValid } from "./sudoku-algo-util";

const TOTAL_CELLS = 81;

function getInitialGrid () {
	const grid: number[][] = [];
	for (let i = 0; i < 9; i++) {
		grid.push(Array(9).fill(0));
	}
	return grid;
}

export function getRandomGrid () {
	const minCellsFilled = 15;
	const maxCellsFilled = 20;
	const randomCellsFilled = getRandomNumber(minCellsFilled, maxCellsFilled);

	// Probability that the cell is initially filled.
	const pFill = randomCellsFilled / TOTAL_CELLS;
	const grid = getInitialGrid();

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const isFilled = Math.random() < pFill;
			if (isFilled) {
				const isValid = fitValidNumber(grid, row, col);
			}
		}
	}
	return grid;
}

function fitValidNumber (board: number[][], row: number, col: number) {
	let currentNumber = getRandomNumber(1, 9);
	let rowColValid = rowAndColAreValid(board, row, col, currentNumber);
	let squareValid = squareIsValid(board, row, col, currentNumber);
	let isValid = rowColValid && squareValid && currentNumber < 10;

	while (!isValid && currentNumber <= 9) {
		currentNumber = getRandomNumber(1, 9);
		rowColValid = rowAndColAreValid(board, row, col, currentNumber);
		squareValid = squareIsValid(board, row, col, currentNumber);
		isValid = rowColValid && squareValid && currentNumber < 10;
	}

	isValid = rowColValid && squareValid && currentNumber < 10;
	if (isValid) {
		board[row][col] = currentNumber;
	} else board[row][col] = 0;
	return isValid;
}
