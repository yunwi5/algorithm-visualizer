import {
	SortingBar as Bar,
	Action,
	SortingAction,
	SortingAlgorithm
} from "../../models/sorting-models";
import { arraysAreEqual } from "../list-util";
import quickSortAlgorithm from "./algorithms/quick-sort";
import mergeSortAlgorithm from "./algorithms/merge-sort";
import insertionSortAlgorithm from "./algorithms/insertion-sort";
import selectionSortAlgorithm from "./algorithms/selection-sort";
import bubbleSortAlgorithm from "./algorithms/bubble-sort";

export function getSortingActions (sortingArray: Bar[], algorithm: SortingAlgorithm) {
	let actionsArray: SortingAction[] = [];

	const sortingIntArray = sortingArray.map((bar) => bar.value);
	let resArr: number[] = [];
	if (algorithm === SortingAlgorithm.BubbleSort) {
		resArr = bubbleSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.SelectionSort) {
		resArr = selectionSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.InsertionSort) {
		resArr = insertionSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.MergeSort) {
		resArr = mergeSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.QuickSort) {
		resArr = quickSortAlgorithm(actionsArray, sortingIntArray);
	} else {
		resArr = mergeSortAlgorithm(actionsArray, sortingIntArray);
	}
	sortingIntArray.sort((a, b) => a - b);
	console.log("Sorting is correct:", arraysAreEqual(sortingIntArray, resArr));

	return actionsArray;
}
// Simple swap operation
export function swap (array: number[], i: number, j: number) {
	const temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

// Common actions for InsertionSort, SelectionSort, and BubbleSort
export function attachCommonAction (
	actions: SortingAction[],
	action: Action,
	idx1: number = -1,
	idx2: number = -1
) {
	actions.push({
		action,
		indexOne: idx1,
		indexTwo: idx2
	});
}
