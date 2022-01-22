import { SortingAction } from "../../../models/sorting-models";
import { swap } from "../sorting-algo-util";

export default function quickSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	quickSortHelper(actionsArray, array, 0, array.length - 1);
	return array;
}

function quickSortHelper (
	actionsArray: SortingAction[],
	array: number[],
	startIndex: number,
	endIndex: number
): void {
	if (startIndex >= endIndex) return;

	let pivot = startIndex;
	let leftPtr = startIndex + 1,
		rightPtr = endIndex;
	while (leftPtr <= rightPtr) {
		let curr = array[pivot];
		while (array[leftPtr] <= curr) {
			leftPtr++;
		}
		while (array[rightPtr] >= curr && rightPtr > pivot) {
			rightPtr--;
		}

		if (leftPtr < rightPtr) {
			swap(array, leftPtr, rightPtr);
		}
	}
	// When leftPtr > rightPtr
	swap(array, pivot, rightPtr);

	const currentSortedIndex = rightPtr;
	quickSortHelper(actionsArray, array, startIndex, currentSortedIndex - 1);
	quickSortHelper(actionsArray, array, currentSortedIndex + 1, endIndex);
}
