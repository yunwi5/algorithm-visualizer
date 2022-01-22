import { SortingAction, Action } from "../../../models/sorting-models";

export default function mergeSortAlgorithm (actionsArray: SortingAction[], array: number[]) {
	let resArr = mergeSortHelper(actionsArray, array, 0);
	actionsArray.push({
		action: Action.FINALIZE,
		indexOne: -1,
		indexTwo: -1
	});

	return resArr;
}

function mergeSortHelper (
	actionsArray: SortingAction[],
	array: number[],
	offset: number
): number[] {
	// Write your code here.
	if (array.length === 1) return array;

	const midIndex = Math.floor((0 + array.length - 1) / 2);
	// For tracking indices
	let leftOffset = offset,
		rightOffset = midIndex + 1 + offset;

	// Recursive call
	const sortedFirstHalf = mergeSortHelper(actionsArray, array.slice(0, midIndex + 1), leftOffset);
	const sortedSecondHalf = mergeSortHelper(actionsArray, array.slice(midIndex + 1), rightOffset);

	const result: number[] = [];
	let n = array.length;
	let sortedCount = 0;
	let leftArrIdx = 0,
		rightArrIdx = 0;

	// Inner function for dispatching actions
	function attachMSAction (action: Action) {
		switch (action) {
			case Action.APPEND:
			case Action.SWAP:
				actionsArray.push({
					action: action,
					indexOne: offset,
					indexTwo: offset + n - 1,
					newSegment: result.concat(
						sortedFirstHalf.slice(leftArrIdx),
						sortedSecondHalf.slice(rightArrIdx)
					),
					indexThree: sortedCount - 1 + offset
				});
				break;
			case Action.PEND:
				actionsArray.push({
					action: Action.PEND,
					indexOne: offset,
					indexTwo: offset + n - 1,
					newSegment: result.concat(
						sortedFirstHalf.slice(leftArrIdx),
						sortedSecondHalf.slice(rightArrIdx)
					),
					indexThree: leftOffset + leftArrIdx + rightArrIdx,
					indexFour: rightOffset + rightArrIdx
				});
				break;
			case Action.COMPLETE:
				actionsArray.push({
					action: Action.COMPLETE,
					indexOne: offset,
					indexTwo: offset + n - 1,
					newSegment: result
				});
		}
	}

	while (leftArrIdx < sortedFirstHalf.length || rightArrIdx < sortedSecondHalf.length) {
		if (rightArrIdx >= sortedSecondHalf.length) {
			result.push(sortedFirstHalf[leftArrIdx]);
			leftArrIdx++;
			sortedCount++;

			attachMSAction(Action.APPEND);
		} else if (leftArrIdx >= sortedFirstHalf.length) {
			result.push(sortedSecondHalf[rightArrIdx]);
			rightArrIdx++;
			sortedCount++;

			attachMSAction(Action.APPEND);
		} else {
			attachMSAction(Action.PEND);

			if (sortedFirstHalf[leftArrIdx] <= sortedSecondHalf[rightArrIdx]) {
				result.push(sortedFirstHalf[leftArrIdx]);
				leftArrIdx++;
				sortedCount++;

				attachMSAction(Action.APPEND);
			} else {
				result.push(sortedSecondHalf[rightArrIdx]);
				rightArrIdx++;
				sortedCount++;

				attachMSAction(Action.SWAP);
			}
		}
	}
	attachMSAction(Action.COMPLETE);

	return result;
}
