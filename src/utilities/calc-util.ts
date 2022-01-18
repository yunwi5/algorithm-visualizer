export const DEFAULT_ARR_SIZE = 20;
export const DEFAULT_SPEED = 10;
export const MIN_SPEED = 500; // 500ms per operation
export const MAX_SPEED = 1; // 5ms per operation

// Translate range value to sorting speed in ms.
export function toSortingSpeed (value: number) {
	// x1 should be 500ms per operation
	// x100 should be 5ms per operation
	const reverse = 1 / value;
	const speed = reverse * ((MIN_SPEED + MAX_SPEED) / 2);
	return speed;
}

export function toMsSpeed (value: number) {
	const reverse = 1 / value;
	const speed = reverse * ((MIN_SPEED + MAX_SPEED) / 2);
	return speed;
}

// Exact Reverse of toSortingSpeed Fn.
export function sortingSpeedToRange (sortingSpeed: number) {
	return 1 / (sortingSpeed / MIN_SPEED);
}

export function getRoundedFormat (num: number) {
	if (num >= 100) return Math.round(num);
	return Math.round(num * 10) / 10;
}

export function getTimeElapsedInFormat (milliseconds: number) {
	const timeInSec = milliseconds / 1000;
	return Math.round(timeInSec * 10) / 10;
}
