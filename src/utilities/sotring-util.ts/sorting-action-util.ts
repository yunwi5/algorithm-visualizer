import {
	SortingAlgorithm,
	SortingAction,
	BarState,
	SortingBar as Bar,
	Action
} from "../../models/sorting-models";

export function executeSortingAction (
	sortingArray: Bar[],
	action: SortingAction,
	algorithm: SortingAlgorithm
) {
	// Always return a new object.
	let sortingArrayCpy = [ ...sortingArray ];
	switch (algorithm) {
		case SortingAlgorithm.BubbleSort:
			bubbleSortAction(sortingArrayCpy, action);
			break;
		case SortingAlgorithm.SelectionSort:
			selectionSortAction(sortingArrayCpy, action);
			break;
		case SortingAlgorithm.InsertionSort:
			insertionSortAction(sortingArrayCpy, action);
			break;
		case SortingAlgorithm.MergeSort:
			mergeSortAction(sortingArrayCpy, action);
			break;
		case SortingAlgorithm.QuickSort:
			quickSortAction(sortingArrayCpy, action);
			break;
		case SortingAlgorithm.HeapSort:
			heapSortAction(sortingArrayCpy, action);
			break;
		default:
			mergeSortAction(sortingArrayCpy, action);
	}

	return sortingArrayCpy;
}

// Helper funcitons
function pendTwoBars (bar1: Bar, bar2: Bar) {
	bar1.status = BarState.PENDING;
	bar2.status = BarState.PENDING;
}

function swapTwoBars (bar1: Bar, bar2: Bar) {
	const temp = bar1.value;
	bar1.value = bar2.value;
	bar2.value = temp;
	bar1.status = BarState.SWAPPED;
	bar2.status = BarState.SWAPPED;
}

function selectRangeBars (sortingArray: Bar[], startIdx: number, endIdex: number) {
	for (let i = startIdx; i <= endIdex; i++) {
		sortingArray[i].status = BarState.SELECTED;
	}
}

function completeOnebar (bar: Bar) {
	bar.status = BarState.SORTED;
}

function finalizeSortingArray (sortingArray: Bar[]) {
	for (let i = 0; i < sortingArray.length; i++) {
		sortingArray[i].status = BarState.FINAL;
	}
}

let heapified = false;

function heapSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo, action: actionState } = action;
	const n = sortingArray.length;

	for (let i = 0; i < n; i++) {
		const bar = sortingArray[i];
		if (bar.status === BarState.PENDING || bar.status === BarState.SWAPPED) {
			if (!heapified) bar.status = BarState.INITIAL;
			else bar.status = BarState.SELECTED;
		}
	}

	switch (actionState) {
		case Action.SELECT:
			// Once the array is max-heapified, select all of them to indicate that they are indeed max heap.
			selectRangeBars(sortingArray, 0, n - 1);
			heapified = true;
			break;
		case Action.PEND:
			if (indexOne >= n || indexOne < 0) throw new Error("Index one out of bound!");
			if (indexTwo >= n || indexTwo < 0) throw new Error("Index two out of boud!");
			pendTwoBars(sortingArray[indexOne], sortingArray[indexTwo]);
			break;
		case Action.SWAP:
			if (indexOne >= n || indexOne < 0) throw new Error("Index one out of bound!");
			if (indexTwo >= n || indexTwo < 0) throw new Error("Index two out of boud!");
			swapTwoBars(sortingArray[indexOne], sortingArray[indexTwo]);
			break;
		case Action.COMPLETE:
			// In HeapSort, only one element is completely sorted at once.
			completeOnebar(sortingArray[indexOne]);
			break;
		case Action.FINALIZE:
			finalizeSortingArray(sortingArray);
			heapified = false;
	}
}

function quickSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo, action: actionState } = action;
	const n = sortingArray.length;

	for (let i = 1; i < n - 1; i++) {
		if (
			sortingArray[i - 1].status === BarState.SORTED &&
			sortingArray[i + 1].status === BarState.SORTED
		)
			sortingArray[i].status = BarState.SORTED;
	}

	switch (actionState) {
		case Action.SELECT:
			const startIdx = indexOne,
				endIdx = indexTwo;
			// Re-select
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (i >= startIdx && i <= endIdx) {
					bar.status = BarState.SELECTED;
				} else if (bar.status !== BarState.SORTED) {
					bar.status = BarState.INITIAL;
				}
			}
			break;
		case Action.PIVOTIZE:
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (bar.status === BarState.PIVOTED) bar.status = BarState.SELECTED;
			}
			sortingArray[indexOne].status = BarState.PIVOTED;
			break;

		case Action.POINT:
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (bar.status === BarState.LEFT_POINTED || bar.status === BarState.RIGHT_POINTED)
					bar.status = BarState.SELECTED;
				if (bar.status === BarState.SWAPPED) bar.status = BarState.SELECTED;
			}
			if (
				indexOne >= 0 &&
				indexOne < n &&
				sortingArray[indexOne].status !== BarState.SORTED &&
				sortingArray[indexOne].status !== BarState.PENDING
			)
				sortingArray[indexOne].status = BarState.LEFT_POINTED;
			if (
				indexTwo >= 0 &&
				indexTwo < n &&
				sortingArray[indexTwo].status !== BarState.SORTED &&
				sortingArray[indexTwo].status !== BarState.PENDING
			)
				sortingArray[indexTwo].status = BarState.RIGHT_POINTED;
			break;
		case Action.PEND:
			if (indexOne >= 0 && indexOne < n) sortingArray[indexOne].status = BarState.PENDING;
			break;
		case Action.SWAP:
			const swBar1 = sortingArray[indexOne],
				swBar2 = sortingArray[indexTwo];
			swapTwoBars(swBar1, swBar2);
			break;

		case Action.COMPLETE:
			const sortedIndex = indexOne;
			const sortedIndex2 = indexTwo;
			if (sortedIndex >= 0 && sortedIndex < n) completeOnebar(sortingArray[sortedIndex]);
			if (sortedIndex2 >= 0 && sortedIndex2 < n) completeOnebar(sortingArray[sortedIndex2]);
			break;

		case Action.FINALIZE:
			finalizeSortingArray(sortingArray);
			break;
	}
}

function mergeSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo, newSegment, indexThree, indexFour } = action;
	const { action: actionState } = action;

	for (let i = 0; i < sortingArray.length; i++) {
		sortingArray[i].status = BarState.INITIAL;
	}

	if (
		actionState === Action.PEND ||
		actionState === Action.APPEND ||
		actionState === Action.SWAP
	) {
		if (newSegment === undefined || indexThree === undefined)
			throw new Error("new segment or key index is undefined!");
		const startIndex = indexOne;
		const lastIndex = indexTwo;
		const keyIndex = indexThree;

		for (let i = startIndex; i <= lastIndex; i++) {
			sortingArray[i].status = BarState.SELECTED;
			if (i < keyIndex) sortingArray[i].status = BarState.SORTED;
			sortingArray[i].value = newSegment[i - startIndex];
		}

		if (actionState === Action.SWAP || actionState === Action.APPEND) {
			sortingArray[keyIndex].status = BarState.SWAPPED;
		} else {
			// PENDING
			if (indexFour) sortingArray[indexFour].status = BarState.PENDING;
			sortingArray[indexThree].status = BarState.PENDING;
		}
	} else if (action.action === Action.COMPLETE) {
		const startIndex = indexOne;
		const lastIndex = indexTwo;
		for (let i = startIndex; i <= lastIndex; i++) {
			// sortingArray[i].status = BarState.SORTED;
			completeOnebar(sortingArray[i]);
		}
	} else if (action.action === Action.FINALIZE) {
		finalizeSortingArray(sortingArray);
	}
}

function insertionSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo } = action;
	const firstBar = sortingArray[action.indexOne];
	const secBar = sortingArray[action.indexTwo];

	for (let i = 0; i < sortingArray.length; i++) {
		const bar = sortingArray[i];

		switch (action.action) {
			case Action.SELECT:
				if (i === indexOne) {
					bar.status = BarState.SELECTED;
				} else if (bar.status !== BarState.SORTED) {
					bar.status = BarState.INITIAL;
				}
				break;
			case Action.PEND:
				// PENDING
				if (i === indexOne || i === indexTwo) {
					bar.status = BarState.PENDING;
				} else if (bar.status === BarState.SWAPPED) {
					bar.status = BarState.SORTED;
				}
				break;
			case Action.SWAP:
				// Swapping
				if (i === indexOne) {
					swapTwoBars(firstBar, secBar);
				}
				break;

			case Action.COMPLETE:
				// CONFIRMING
				if (i <= indexOne) {
					bar.status = BarState.SORTED;
				} else {
					bar.status = BarState.INITIAL;
				}
				break;
			case Action.FINALIZE:
				// FINALIZING
				bar.status = BarState.FINAL;
				break;
		}
	}
}

export function bubbleSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo } = action;
	const firstBar = sortingArray[action.indexOne];
	const secBar = sortingArray[action.indexTwo];

	for (let i = 0; i < sortingArray.length; i++) {
		const bar = sortingArray[i];

		switch (action.action) {
			case Action.PEND:
				// PENDING
				if (i === indexOne || i === indexTwo) {
					bar.status = BarState.PENDING;
				} else if (bar.status !== BarState.SORTED) {
					bar.status = BarState.INITIAL;
				}
				break;
			case Action.SWAP:
				// SWAPPING
				if (i === indexOne) {
					swapTwoBars(firstBar, secBar);
				} else if (i !== indexTwo && bar.status !== BarState.SORTED) {
					bar.status = BarState.INITIAL;
				}
				break;
			case Action.COMPLETE:
				// CONFIRMING
				if (i >= indexOne) {
					bar.status = BarState.SORTED;
				} else if (bar.status !== BarState.INITIAL) {
					bar.status = BarState.INITIAL;
				}
				break;
			case Action.FINALIZE:
				// FINALIZING
				bar.status = BarState.FINAL;
				break;
		}
	}
}

function selectionSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo } = action;
	let firstBar: Bar, secBar: Bar;

	switch (action.action) {
		case Action.PIVOTIZE:
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (bar.status !== BarState.SORTED && bar.status !== BarState.SELECTED) {
					bar.status = BarState.INITIAL;
				}
			}
			firstBar = sortingArray[indexOne];
			firstBar.status = BarState.PIVOTED;
			break;
		case Action.SELECT:
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (bar.status !== BarState.SORTED && bar.status !== BarState.PIVOTED) {
					bar.status = BarState.INITIAL;
				}
			}
			firstBar = sortingArray[indexOne];
			firstBar.status = BarState.SELECTED;
			break;
		case Action.PEND:
			// PENDING
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (i === indexOne || i === indexTwo) continue;
				if (
					bar.status !== BarState.SORTED &&
					bar.status !== BarState.PIVOTED &&
					bar.status !== BarState.SELECTED
				) {
					bar.status = BarState.INITIAL;
				}
			}
			secBar = sortingArray[indexTwo];
			secBar.status = BarState.PENDING;
			break;
		case Action.SWAP:
			// SWAPPING
			firstBar = sortingArray[indexOne];
			secBar = sortingArray[indexTwo];
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (
					bar.status !== BarState.SORTED &&
					bar.status !== BarState.PIVOTED &&
					bar.status !== BarState.SELECTED
				) {
					bar.status = BarState.INITIAL;
				}
			}
			swapTwoBars(firstBar, secBar);
			break;
		case Action.COMPLETE:
			// CONFIRMING
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (i >= indexOne) {
					completeOnebar(bar);
				} else {
					bar.status = BarState.INITIAL;
				}
			}
			break;
		case Action.FINALIZE:
			// FINALIZING
			finalizeSortingArray(sortingArray);
			break;
	}
}
