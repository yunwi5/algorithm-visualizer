import { SortingAction, Action } from "../../../models/sorting-models/sorting-models";
import { attachCommonAction } from "../sorting-algo-util";

export default function bubbleSortAlgorithm (actionsArray: SortingAction[], arr: number[]) {
	let lastIndex = arr.length - 1;
	while (lastIndex > 0) {
		let swaps = 0;
		for (let i = 0; i < lastIndex; i++) {
			// Move to pending state.
			attachCommonAction(actionsArray, Action.PEND, i, i + 1);

			if (arr[i] > arr[i + 1]) {
				// Need to perform Pending and Swapping!
				[ arr[i + 1], arr[i] ] = [ arr[i], arr[i + 1] ];
				attachCommonAction(actionsArray, Action.SWAP, i, i + 1);
				swaps++;
			}
		}
		attachCommonAction(actionsArray, Action.COMPLETE, lastIndex);

		if (swaps === 0) break;
		lastIndex--;
	}
	// After sorting everything!
	attachCommonAction(actionsArray, Action.FINALIZE);

	return arr.slice();
}
