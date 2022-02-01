import { SudokuAction, CellState, ActionState, SudokuCell } from "../../models/sudoku-model";

export function finalizeGrid (grid: SudokuCell[][], finalState: CellState = CellState.FINAL_VALID) {
	console.log("finalize grid");
	for (const row of grid) {
		for (const cell of row) {
			cell.status = finalState;
		}
	}
}

function resetInvalidCells (grid: SudokuCell[][]) {
	for (const row of grid) {
		for (const cell of row) {
			if (cell.value === 9 && cell.status === CellState.INVALID) {
				cell.value = 0;
				cell.status = CellState.INITIAL;
			}
		}
	}
}

export function executeSudokuAction (grid: SudokuCell[][], action: SudokuAction) {
	const gridCpy = [ ...grid ];
	const { row, col, current, actionState } = action;
	let currCell;

	switch (actionState) {
		case ActionState.TRY_FIT:
			currCell = gridCpy[row][col];
			currCell.status = CellState.PENDING;
			currCell.value = current;
			resetInvalidCells(gridCpy);
			break;
		case ActionState.SET_VALID:
			currCell = gridCpy[row][col];
			currCell.status = CellState.VALID;
			currCell.value = current;
			break;
		case ActionState.SET_INVALID:
			currCell = gridCpy[row][col];
			currCell.status = CellState.INVALID;
			currCell.value = current;
			break;
		case ActionState.FINAL_VALID:
			finalizeGrid(gridCpy, CellState.FINAL_VALID);
			break;
		case ActionState.FINAL_INVALID:
			finalizeGrid(gridCpy, CellState.FINAL_INVALID);
	}
	return gridCpy;
}
