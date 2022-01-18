import {
	SortingAlgorithm,
	SortingAction,
	Action,
	BarState,
	SortingBar as Bar
} from "../../models/sorting-models";

export function bubbleSortAction (sortingArray: Bar[], action: SortingAction) {
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
		newSortingArray.push(bar);
	}
	return newSortingArray;
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
			firstBar = sortingArray[indexOne];
			secBar = sortingArray[indexTwo];
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
				if (i === indexOne || i === indexTwo) continue;
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
				}

				if (bar.status !== BarState.SORTED) {
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
	} else {
		bubbleSortAction(sortingArrayCpy, action);
	}

	return sortingArrayCpy;
}
