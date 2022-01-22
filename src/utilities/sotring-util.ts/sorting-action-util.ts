import {
	SortingAlgorithm,
	SortingAction,
	Action,
	BarState,
	SortingBar as Bar
} from "../../models/sorting-models";

export function executeSortingAction (
	sortingArray: Bar[],
	action: SortingAction,
	algorithm: SortingAlgorithm
) {
	// Always return a new object.
	let sortingArrayCpy = [ ...sortingArray ];
	if (algorithm === SortingAlgorithm.BubbleSort) {
		bubbleSortAction(sortingArrayCpy, action);
	} else if (algorithm === SortingAlgorithm.SelectionSort) {
		selectionSortAction(sortingArrayCpy, action);
	} else if (algorithm === SortingAlgorithm.InsertionSort) {
		insertionSortAction(sortingArrayCpy, action);
	} else if (algorithm === SortingAlgorithm.MergeSort) {
		try {
			sortingArrayCpy = mergeSortAction(sortingArrayCpy, action);
		} catch (err) {
			console.error(err);
		}
	} else {
		bubbleSortAction(sortingArrayCpy, action);
	}

	return sortingArrayCpy;
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
			sortingArray[i].status = BarState.SORTED;
		}
	} else if (action.action === Action.FINALIZE) {
		for (let i = 0; i < sortingArray.length; i++) {
			const bar = sortingArray[i];
			bar.status = BarState.FINAL;
		}
	}

	return sortingArray;
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
					firstBar.status = BarState.SWAPPED;
					secBar.status = BarState.SWAPPED;
					const temp = firstBar.value;
					firstBar.value = secBar.value;
					secBar.value = temp;
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
					firstBar.status = BarState.SWAPPED;
					secBar.status = BarState.SWAPPED;
					const temp = firstBar.value;
					firstBar.value = secBar.value;
					secBar.value = temp;
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
			const temp = firstBar.value;
			firstBar.value = secBar.value;
			secBar.value = temp;
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
			firstBar.status = BarState.SWAPPED;
			secBar.status = BarState.SWAPPED;
			break;
		case Action.COMPLETE:
			// CONFIRMING
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				if (i >= indexOne) {
					bar.status = BarState.SORTED;
				} else {
					bar.status = BarState.INITIAL;
				}
			}
			break;
		case Action.FINALIZE:
			// FINALIZING
			for (let i = 0; i < sortingArray.length; i++) {
				const bar = sortingArray[i];
				bar.status = BarState.FINAL;
			}
			break;
	}
}
