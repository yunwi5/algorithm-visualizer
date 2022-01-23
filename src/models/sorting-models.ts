// Sorting Algorithm Related
export enum SortingAlgorithm {
	BubbleSort = "BubbleSort",
	SelectionSort = "SelectionSort",
	InsertionSort = "InsertionSort",
	MergeSort = "MergeSort",
	QuickSort = "QuickSort"
}

export const SortingAlgorithmList = [
	SortingAlgorithm.BubbleSort,
	SortingAlgorithm.SelectionSort,
	SortingAlgorithm.InsertionSort,
	SortingAlgorithm.MergeSort,
	SortingAlgorithm.QuickSort
];

// Sorting Bar Related
export enum BarState {
	INITIAL = "initial",
	PENDING = "pending",
	SWAPPED = "swapped",
	SORTED = "sorted",
	FINAL = "final",
	PIVOTED = "pivoted",
	SELECTED = "selected",

	// QuickSort Point
	LEFT_POINTED = "left-pointed",
	RIGHT_POINTED = "right-pointed"
}

export interface SortingBar {
	value: number;
	status: BarState;
}

// Sorting Action Related
export enum Action {
	INITIALIZE = "initialize",
	SWAP = "swap",
	PEND = "pend",
	COMPLETE = "complete",
	FINALIZE = "finalize",
	PIVOTIZE = "pivotize",
	// New action for SelectionSort
	SELECT = "select",

	// Mergesort Append
	APPEND = "append",

	// Quicksort Point
	POINT = "point"
}

// Invalid index is just -1.
export interface SortingAction {
	action: Action;
	indexOne: number;
	indexTwo: number;

	// Optional
	newSegment?: number[];
	indexThree?: number;
	indexFour?: number;
}
