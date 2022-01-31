export function createDeepArrayCopy<T> (originalArr: T[]) {
	return originalArr.map((elem) => ({ ...elem }));
}

export function arraysAreEqual<T> (arr1: T[], arr2: T[]) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

// Helper funciton
export function copyBoard<T> (board: T[][]) {
	const newBoard = board.map((row) => [ ...row ]);
	return newBoard;
}
