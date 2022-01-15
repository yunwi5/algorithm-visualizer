import { Bar, Action, SortingAction, SortingAlgorithm } from "../../models/sorting-models";

function arraysAreEqual<T> (arr1: T[], arr2: T[]) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
}

export function getSortingActions (sortingArray: Bar[], algorithm: SortingAlgorithm) {
	let actionsArray: SortingAction[] = [];

	const sortingIntArray = sortingArray.map((bar) => bar.value);
	let resArr: number[] = [];
	if (algorithm === SortingAlgorithm.BubbleSort) {
		resArr = BubbleSortAlgorithm(actionsArray, sortingIntArray);
	} else {
		// Only have BubbleSort algorithm at the moment!
		resArr = BubbleSortAlgorithm(actionsArray, sortingIntArray);
	}

	// Validate the output.
	// sortingIntArray.sort((a, b) => a - b);
	// console.log("Sorting is correct:", arraysAreEqual(sortingIntArray, resArr));

	return actionsArray;
}

function BubbleSortAlgorithm (actionsArray: SortingAction[], arr: number[]) {
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
			indexOne: lastIndex - 1,
			indexTwo: lastIndex
		});

		if (swaps === 0) break;
		lastIndex--;
	}
	// After sorting everything!
	actionsArray.push({
		action: Action.FINALIZE,
		indexOne: 100,
		indexTwo: 100
	});
	return arr.slice();
}
