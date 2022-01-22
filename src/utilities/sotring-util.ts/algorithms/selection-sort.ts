import { SortingAction, Action } from "../../../models/sorting-models";
import { attachCommonAction } from "../sorting-algo-util";

export default function selectionSortAlgorithm (actionsArray: SortingAction[], arr: number[]) {
	let lastIndex = arr.length - 1;
	while (lastIndex >= 0) {
		let biggestIndex = 0;
		// Pivot (last index in this case)
		attachCommonAction(actionsArray, Action.PIVOTIZE, lastIndex);
		// Select first biggest index element
		attachCommonAction(actionsArray, Action.SELECT, biggestIndex);

		for (let i = 0; i < lastIndex; i++) {
			// compare first.
			attachCommonAction(actionsArray, Action.PEND, biggestIndex, i);

			if (arr[i] > arr[biggestIndex]) {
				// Select new biggest index
				attachCommonAction(actionsArray, Action.SELECT, i);

				// update the biggest index
				biggestIndex = i;
			}
		}
		if (arr[biggestIndex] > arr[lastIndex]) {
			// Now Actual Swap with the last index that is yet sorted
			attachCommonAction(actionsArray, Action.SWAP, biggestIndex, lastIndex);
			[ arr[biggestIndex], arr[lastIndex] ] = [ arr[lastIndex], arr[biggestIndex] ];
		}
		// SORTED!
		attachCommonAction(actionsArray, Action.COMPLETE, lastIndex);
		lastIndex--;
	}
	// After sorting everything!
	attachCommonAction(actionsArray, Action.FINALIZE);
	return arr.slice();
}
