import { SortingAction, Action } from "../../../models/sorting-models";
import { swap, attachCommonAction } from "../sorting-algo-util";

export default function quickSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	quickSortHelper(actionsArray, array, 0, array.length - 1);
	attachCommonAction(actionsArray, Action.FINALIZE);
	return array;
}

function quickSortHelper (
	actionsArray: SortingAction[],
	array: number[],
	startIndex: number,
	endIndex: number
): void {
	if (startIndex >= endIndex) {
		attachCommonAction(actionsArray, Action.COMPLETE, startIndex, endIndex);
		return;
	}

	let pivot = startIndex;
	let leftPtr = startIndex + 1,
		rightPtr = endIndex;

	// Initialize with selecting the range
	attachCommonAction(actionsArray, Action.SELECT, startIndex, endIndex);

	// Pivotize and Point two ptrs
	attachCommonAction(actionsArray, Action.PIVOTIZE, pivot);
	attachCommonAction(actionsArray, Action.POINT, leftPtr, rightPtr);
	while (leftPtr <= rightPtr) {
		let curr = array[pivot];
		while (array[leftPtr] <= curr) {
			leftPtr++;
			// Update left ptr
			attachCommonAction(actionsArray, Action.POINT, leftPtr, rightPtr);
		}
		// Left ptr finds the bigger element, moving to Pending state.
		attachCommonAction(actionsArray, Action.PEND, leftPtr);

		while (array[rightPtr] >= curr && rightPtr > pivot) {
			rightPtr--;
			// Update right ptr
			attachCommonAction(actionsArray, Action.POINT, leftPtr, rightPtr);
		}
		// Right ptr finds the smaller element
		attachCommonAction(actionsArray, Action.PEND, rightPtr);

		if (leftPtr < rightPtr) {
			swap(array, leftPtr, rightPtr);
			// swap elements at idx left ptr and right ptr
			attachCommonAction(actionsArray, Action.SWAP, leftPtr, rightPtr);
		}
	}
	// When leftPtr > rightPtr
	swap(array, pivot, rightPtr);
	// swaps elements at index pivot and right ptr
	attachCommonAction(actionsArray, Action.SWAP, pivot, rightPtr);

	const currentSortedIndex = rightPtr;
	// Complete, meaning one recursive call is finished
	attachCommonAction(actionsArray, Action.COMPLETE, currentSortedIndex);

	quickSortHelper(actionsArray, array, startIndex, currentSortedIndex - 1);
	quickSortHelper(actionsArray, array, currentSortedIndex + 1, endIndex);
}
