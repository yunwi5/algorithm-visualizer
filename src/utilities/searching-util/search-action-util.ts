import {
	SearchBar,
	SearchBarState as BarState,
	SearchAction,
	ActionState,
	SearchAlgorithm
} from "../../models/search-model";

export function executeSearchAction (
	searchArray: SearchBar[],
	searchAction: SearchAction,
	algorithm: SearchAlgorithm
) {
	const searchArrayCpy = [ ...searchArray ];

	if (algorithm === SearchAlgorithm.BINARY_SEARCH) {
		binarySearchAction(searchArrayCpy, searchAction);
	} else if (algorithm === SearchAlgorithm.LINEAR_SEARCH) {
		linearSearchAction(searchArrayCpy, searchAction);
	}
	return searchArrayCpy;
}

function initializeSearchArray (searchArray: SearchBar[]) {
	for (let i = 0; i < searchArray.length; i++) {
		const bar = searchArray[i];
		bar.status = BarState.INITIAL;
	}
}

function pointMinAndMax (
	searchArray: SearchBar[],
	minIndex: number | undefined,
	maxIndex: number | undefined
) {
	if (minIndex !== undefined && maxIndex !== undefined) {
		searchArray[minIndex].status = BarState.POINTED;
		searchArray[maxIndex].status = BarState.POINTED;
	}
}

function binarySearchAction (searchArray: SearchBar[], searchAction: SearchAction) {
	const { current: currentIndex, minIndex, maxIndex } = searchAction;
	const currentBar = searchArray[currentIndex];

	switch (searchAction.action) {
		case ActionState.POINT:
			initializeSearchArray(searchArray);
			pointMinAndMax(searchArray, minIndex, maxIndex);
			break;
		case ActionState.PEND:
			initializeSearchArray(searchArray);
			pointMinAndMax(searchArray, minIndex, maxIndex);
			currentBar.status = BarState.PENDING;
			break;
		case ActionState.INCORRECT:
			initializeSearchArray(searchArray);
			pointMinAndMax(searchArray, minIndex, maxIndex);
			currentBar.status = BarState.INCORRECT;
			break;
		case ActionState.CORRECT:
			initializeSearchArray(searchArray);
			pointMinAndMax(searchArray, minIndex, maxIndex);
			currentBar.status = BarState.CORRECT;
			break;
		case ActionState.FINAL_INVALID:
			for (let i = 0; i < searchArray.length; i++) {
				const bar = searchArray[i];
				bar.status = BarState.FINAL_INVALID;
			}
			break;
		case ActionState.FINAL_VALID:
			initializeSearchArray(searchArray);
			currentBar.status = BarState.FINAL_VALID;
	}
}

function linearSearchAction (searchArray: SearchBar[], searchAction: SearchAction) {
	let currentIndex = searchAction.current;
	const currentBar = searchArray[currentIndex];

	switch (searchAction.action) {
		case ActionState.PEND:
			initializeSearchArray(searchArray);
			currentBar.status = BarState.PENDING;
			break;
		case ActionState.INCORRECT:
			initializeSearchArray(searchArray);
			currentBar.status = BarState.INCORRECT;
			break;

		case ActionState.CORRECT:
			initializeSearchArray(searchArray);
			currentBar.status = BarState.CORRECT;
			break;
		case ActionState.FINAL_INVALID:
			for (let i = 0; i < searchArray.length; i++) {
				const bar = searchArray[i];
				bar.status = BarState.FINAL_INVALID;
			}
			break;
		case ActionState.FINAL_VALID:
			currentBar.status = BarState.FINAL_VALID;
			break;
	}
}
