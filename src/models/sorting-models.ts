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
	PIVOTED = "pivoted"
}

export interface Bar {
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
	PIVOTIZE = "pivotize"
}

export interface SortingAction {
	action: Action;
	indexOne: number;
	indexTwo: number;
	indexThree?: number;
}
