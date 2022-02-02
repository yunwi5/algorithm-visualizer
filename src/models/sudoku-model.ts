export enum PlayMode {
	MACHINE = "machine",
	USER = "user"
}

export enum ActionState {
	TRY_FIT = "try-fit",
	SET_VALID = "valid",
	SET_INVALID = "invalid",
	FINAL_VALID = "final-valid",
	FINAL_INVALID = "final-invalid"
}

export interface SudokuAction {
	row: number;
	col: number;
	current: number;
	actionState: ActionState;
}

export enum CellState {
	INITIAL = "initial",
	PENDING = "pending",
	FIXED = "fixed",
	VALID = "valid",
	INVALID = "invalid",
	FINAL_VALID = "final-valid",
	FINAL_INVALID = "final-invalid"
}

export interface SudokuCell {
	value: number;
	status: CellState;
	errMessages?: string[];
}
