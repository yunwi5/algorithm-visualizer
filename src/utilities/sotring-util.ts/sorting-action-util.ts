import {
	SortingAlgorithm,
	SortingAction,
	Action,
	BarState,
	Bar
} from "../../models/sorting-models";

export function executeBubbleSortAction (sortingArray: Bar[], action: SortingAction) {
	const { indexOne, indexTwo } = action;
	const firstBar = sortingArray[action.indexOne];
	const secBar = sortingArray[action.indexTwo];

	let newSortingArray: Bar[] = [];
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
				if (i >= indexTwo) {
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
		newSortingArray.push(bar);
	}
	return newSortingArray;
}

export function executeSortingAction (
	sortingArray: Bar[],
	action: SortingAction,
	algorithm: SortingAlgorithm
) {
	// Always return a new object.
	let sortingArrayCpy = [ ...sortingArray ];
	if (algorithm === SortingAlgorithm.BubbleSort) {
		executeBubbleSortAction(sortingArrayCpy, action);
	} else {
		executeBubbleSortAction(sortingArrayCpy, action);
	}

	return sortingArrayCpy;
}
