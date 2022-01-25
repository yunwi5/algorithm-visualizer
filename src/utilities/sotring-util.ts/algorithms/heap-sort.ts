import { SortingAction, Action } from "../../../models/sorting-models";
import { swap, attachCommonAction } from "../sorting-algo-util";

export default function heapSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	createMaxHeap(actionsArray, array);
	attachCommonAction(actionsArray, Action.SELECT);
	for (let lastIndex = array.length - 1; lastIndex >= 1; lastIndex--) {
		swap(array, 0, lastIndex);
		// swapping state, no pending (comparison) is required.
		attachCommonAction(actionsArray, Action.SWAP, 0, lastIndex);
		// current lastIndex is sorted (completed)
		attachCommonAction(actionsArray, Action.COMPLETE, lastIndex);
		shiftDown(actionsArray, array, 0, lastIndex - 1);
	}

	attachCommonAction(actionsArray, Action.FINALIZE);
	return array;
}

function createMaxHeap (actionsArray: SortingAction[], array: number[]) {
	let n = array.length;
	let latestWithChild = Math.floor(n / 2);
	for (let parentIdx = latestWithChild; parentIdx >= 0; parentIdx--) {
		shiftDown(actionsArray, array, parentIdx, n - 1);
	}
}

function shiftDown (
	actionsArray: SortingAction[],
	array: number[],
	startIndex: number,
	lastIndex: number
) {
	let currIndex = startIndex;
	let firChildIdx: number, secChildIdx: number;
	while (hasChild(currIndex, lastIndex)) {
		firChildIdx = (currIndex + 1) * 2 - 1;
		secChildIdx = firChildIdx + 1;

		if (secChildIdx > lastIndex) {
			// second child is out of bound

			// Pending state
			attachCommonAction(actionsArray, Action.PEND, currIndex, firChildIdx);
			if (array[currIndex] < array[firChildIdx]) {
				swap(array, currIndex, firChildIdx);

				// Swapping state
				attachCommonAction(actionsArray, Action.SWAP, currIndex, firChildIdx);
				currIndex = firChildIdx;
			}
			return;
		} else {
			// both first child and second child are valid

			// pending state
			attachCommonAction(actionsArray, Action.PEND, currIndex, firChildIdx);
			attachCommonAction(actionsArray, Action.PEND, currIndex, secChildIdx);

			if (array[currIndex] >= array[firChildIdx] && array[currIndex] >= array[secChildIdx])
				return;
			if (array[firChildIdx] >= array[secChildIdx]) {
				swap(array, currIndex, firChildIdx);

				// swapping state
				attachCommonAction(actionsArray, Action.SWAP, currIndex, firChildIdx);
				currIndex = firChildIdx;
			} else {
				swap(array, currIndex, secChildIdx);

				// swapping state
				attachCommonAction(actionsArray, Action.SWAP, currIndex, secChildIdx);
				currIndex = secChildIdx;
			}
		}
	}
}

function hasChild (currIndex: number, lastIndex: number) {
	return currIndex * 2 + 1 <= lastIndex;
}
