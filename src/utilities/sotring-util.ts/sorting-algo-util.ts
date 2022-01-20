import {
	SortingBar as Bar,
	Action,
	SortingAction,
	SortingAlgorithm
} from "../../models/sorting-models";
import { arraysAreEqual } from "../list-util";

export function getSortingActions (sortingArray: Bar[], algorithm: SortingAlgorithm) {
	let actionsArray: SortingAction[] = [];

	console.log("algorithm:", algorithm);

	const sortingIntArray = sortingArray.map((bar) => bar.value);
	let resArr: number[] = [];
	if (algorithm === SortingAlgorithm.BubbleSort) {
		resArr = bubbleSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.SelectionSort) {
		resArr = selectionSortAlgorithm(actionsArray, sortingIntArray);
		// BubbleSortAlgorithm(actionsArray, sortingIntArray);
	} else if (algorithm === SortingAlgorithm.InsertionSort) {
		resArr = insertionSortAlgorithm(actionsArray, sortingIntArray);
	} else {
		// Only have BubbleSort algorithm at the moment!
		resArr = bubbleSortAlgorithm(actionsArray, sortingIntArray);
	}

	// Validate the output.
	sortingIntArray.sort((a, b) => a - b);
	console.log("Sorting is correct:", arraysAreEqual(sortingIntArray, resArr));

	return actionsArray;
}

function insertionSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	// Write your code here.
	for (let curr = 0; curr <= array.length - 1; curr++) {
		// Selected
		actionsArray.push({
			action: Action.SELECT,
			indexOne: curr,
			indexTwo: -1
		});
		for (let i = curr; i > 0; i--) {
			actionsArray.push({
				action: Action.PEND,
				indexOne: i,
				indexTwo: i - 1
			});
			// Terminate as the subarray is already sorted
			if (array[i] >= array[i - 1]) break;

			actionsArray.push({
				action: Action.SWAP,
				indexOne: i,
				indexTwo: i - 1
			});
			[ array[i], array[i - 1] ] = [ array[i - 1], array[i] ];
		}

		actionsArray.push({
			action: Action.COMPLETE,
			indexOne: curr,
			indexTwo: -1,
			indexThree: curr
		});
	}

	actionsArray.push({
		action: Action.FINALIZE,
		indexOne: -1,
		indexTwo: -1
	});
	return array;
}

function selectionSortAlgorithm (actionsArray: SortingAction[], arr: number[]) {
	let lastIndex = arr.length - 1;
	while (lastIndex >= 0) {
		let biggestIndex = 0;

		// Pivot (last index in this case)
		actionsArray.push({
			action: Action.PIVOTIZE,
			indexOne: lastIndex,
			indexTwo: -1
		});
		// Select first biggest index element
		actionsArray.push({
			action: Action.SELECT,
			indexOne: biggestIndex,
			indexTwo: -1
		});

		let numChanges = 0;
		for (let i = 0; i < lastIndex; i++) {
			// compare first.
			actionsArray.push({
				action: Action.PEND,
				indexOne: biggestIndex,
				indexTwo: i
			});
			if (arr[i] > arr[biggestIndex]) {
				// Select new biggest index
				actionsArray.push({
					action: Action.SELECT,
					indexOne: i,
					indexTwo: -1
				});

				// update the biggest index
				biggestIndex = i;

				// track number of changes
				numChanges++;
			}
		}
		if (arr[biggestIndex] > arr[lastIndex]) {
			// Actual Swap
			actionsArray.push({
				action: Action.SWAP,
				indexOne: biggestIndex,
				indexTwo: lastIndex
			});
			// now swap with the last index that is yet sorted
			[ arr[biggestIndex], arr[lastIndex] ] = [ arr[lastIndex], arr[biggestIndex] ];
			numChanges++;
		}
		// SORTED!
		actionsArray.push({
			action: Action.COMPLETE,
			indexOne: lastIndex,
			indexTwo: -1
		});
		lastIndex--;
	}
	// After sorting everything!
	actionsArray.push({
		action: Action.FINALIZE,
		indexOne: -1,
		indexTwo: -1
	});
	return arr.slice();
}

function bubbleSortAlgorithm (actionsArray: SortingAction[], arr: number[]) {
	let lastIndex = arr.length - 1;
	while (lastIndex > 0) {
		let swaps = 0;
		for (let i = 0; i < lastIndex; i++) {
			// Move to pending state.
			actionsArray.push({
				action: Action.PEND,
				indexOne: i,
				indexTwo: i + 1
			});
			if (arr[i] > arr[i + 1]) {
				// Need to perform Pending and Swapping!
				[ arr[i + 1], arr[i] ] = [ arr[i], arr[i + 1] ];
				// console.log("Swap!");
				actionsArray.push({
					action: Action.SWAP,
					indexOne: i,
					indexTwo: i + 1
				});
				swaps++;
			}
		}
		actionsArray.push({
			action: Action.COMPLETE,
			indexOne: lastIndex,
			indexTwo: -1
		});

		if (swaps === 0) break;
		lastIndex--;
	}
	// After sorting everything!
	actionsArray.push({
		action: Action.FINALIZE,
		indexOne: -1,
		indexTwo: -1
	});
	return arr.slice();
}
