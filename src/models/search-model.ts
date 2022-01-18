export enum SearchAlgorithm {
	BINARY_SEARCH = "BinarySearch",
	LINEAR_SEARCH = "LinearSearch"
}

// Search Action Related
export enum ActionState {
	INITIALIZE = "initialize",
	PEND = "pend",
	CORRECT = "correct",
	INCORRECT = "incorrect",
	FINAL_VALID = "final-valid",
	FINAL_INVALID = "final-invalid",
	POINT = "point"
}
// routine: POINT -> PEND (compare) -> INCORRECT -> POINT -> PEND (compare) -> CORRECT (finish)

export interface SearchAction {
	minIndex?: number;
	maxIndex?: number;
	current: number;
	action: ActionState;
}

// Searching Bar Related
export enum SearchBarState {
	INITIAL = "initial",
	PENDING = "pending",
	POINTED = "pointed point", // Binary Search
	CORRECT = "correct",
	INCORRECT = "incorrect",
	FINAL_VALID = "final-valid point",
	FINAL_INVALID = "final-invalid"
}

export interface SearchBar {
	value: number;
	status: SearchBarState;
}
