import { SortingAction, Action } from "../../../models/sorting-models";
import { attachCommonAction } from "../sorting-algo-util";

export default function insertionSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	for (let curr = 0; curr <= array.length - 1; curr++) {
		// Selected
		attachCommonAction(actionsArray, Action.SELECT, curr);
		for (let i = curr; i > 0; i--) {
			attachCommonAction(actionsArray, Action.PEND, i, i - 1);

			// Terminate as the subarray is already sorted
			if (array[i] >= array[i - 1]) break;

			// Unsorted, so swap two elements.
			attachCommonAction(actionsArray, Action.SWAP, i, i - 1);
			[ array[i], array[i - 1] ] = [ array[i - 1], array[i] ];
		}
		attachCommonAction(actionsArray, Action.COMPLETE, curr);
	}

	attachCommonAction(actionsArray, Action.FINALIZE);
	return array;
}
