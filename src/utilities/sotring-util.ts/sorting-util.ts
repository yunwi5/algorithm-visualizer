import { BarState, Bar } from "../../models/sorting-models";

export const MIN_BAR_HEIGHT = 5;
export const MAX_BAR_HEIGHT = 200;
export function createRandomSortingArray (arrSize: number) {
	let randomArr: Bar[] = [];
	for (let i = 0; i < arrSize; i++) {
		const randomHeight =
			Math.floor(Math.random() * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT + 1)) + MIN_BAR_HEIGHT;

		// Create random Bar object and push it to the random array.
		randomArr.push({
			value: randomHeight,
			status: BarState.INITIAL
		});
	}

	return randomArr;
}

// export function createDeepCopyBarArray (originalArr: Bar[]) {
// 	let newArr: Bar[] = [];
// 	for (let bar of originalArr) {
// 		const barCopy = { ...bar };
// 		newArr.push(barCopy);
// 	}
// 	return newArr;
// }

// Dynammic bar styling which is the key of the animation
export function getBarFontSize (arraySize: number) {
	if (arraySize < 10) {
		return 90;
	} else if (arraySize < 30) {
		return 70;
	} else if (arraySize < 50) {
		return 50;
	} else if (arraySize < 70) {
		return 30;
	} else {
		return 0;
	}
}
