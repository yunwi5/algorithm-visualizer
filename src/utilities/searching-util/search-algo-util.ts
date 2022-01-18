import { SearchBar, SearchAlgorithm, SearchAction, ActionState } from "../../models/search-model";

export function getSearchActions (
	searchArray: SearchBar[],
	algorithm: SearchAlgorithm,
	target: number
) {
	const searchActions: SearchAction[] = [];
	const searchIntArray = searchArray.map((bar) => bar.value);
	let index = 0;
	if (algorithm === SearchAlgorithm.BINARY_SEARCH) {
		index = binarySearchAlgorithm(searchActions, searchIntArray, target);
	} else if (algorithm === SearchAlgorithm.LINEAR_SEARCH) {
		index = linearSearchAlgorithm(searchActions, searchIntArray, target);
	}

	// validate answer
	const correctIndex = searchArray.findIndex((bar) => bar.value === target);
	// console.log(`${algorithm}, index: ${index}, answer: ${correctIndex}`);

	return searchActions;
}

function binarySearchAlgorithm (actionsArray: SearchAction[], arr: number[], target: number) {
	let minIndex = 0,
		maxIndex = arr.length - 1;

	while (maxIndex >= minIndex) {
		let midIndex = Math.floor((minIndex + maxIndex) / 2);

		// Point min and max
		actionsArray.push({
			minIndex,
			maxIndex,
			current: -1,
			action: ActionState.POINT
		});

		// Pending state for comparison
		actionsArray.push({
			minIndex,
			maxIndex,
			current: midIndex,
			action: ActionState.PEND
		});

		if (arr[midIndex] === target) {
			// Correct and Final Valid
			actionsArray.push({
				minIndex,
				maxIndex,
				current: midIndex,
				action: ActionState.CORRECT
			});
			actionsArray.push({
				current: midIndex,
				action: ActionState.FINAL_VALID
			});
			return midIndex;
		} else {
			// Incorrect
			actionsArray.push({
				minIndex,
				maxIndex,
				current: midIndex,
				action: ActionState.INCORRECT
			});

			if (arr[midIndex] < target) {
				minIndex = midIndex + 1;
			} else if (arr[midIndex] > target) {
				maxIndex = midIndex - 1;
			}
		}
	}
	// Final Invalid, Not found
	actionsArray.push({
		current: -1,
		action: ActionState.FINAL_INVALID
	});

	return -1;
}

export function binarySearch (array: number[], target: number): number {
	// Write your code here.
	let minIndex = 0,
		maxIndex = array.length - 1;

	while (maxIndex >= minIndex) {
		let midIndex = Math.floor((minIndex + maxIndex) / 2);
		if (array[midIndex] === target) return midIndex;
		else if (array[midIndex] < target) {
			minIndex = midIndex + 1;
		} else if (array[midIndex] > target) {
			maxIndex = midIndex - 1;
		}
	}

	return -1;
}

function linearSearchAlgorithm (actionsArray: SearchAction[], arr: number[], target: number) {
	let index = -1;
	for (let i = 0; i < arr.length; i++) {
		actionsArray.push({
			current: i,
			action: ActionState.PEND
		});

		if (arr[i] === target) {
			actionsArray.push({
				current: i,
				action: ActionState.CORRECT
			});
			actionsArray.push({
				current: i,
				action: ActionState.FINAL_VALID
			});
			index = i;
			break;
		} else {
			actionsArray.push({
				current: i,
				action: ActionState.INCORRECT
			});
		}

		if (target > arr[i] && target < arr[i + 1]) {
			actionsArray.push({
				current: i,
				action: ActionState.FINAL_INVALID
			});
			break;
		}
	}

	return index;
}
