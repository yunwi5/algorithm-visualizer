export function createDeepArrayCopy<T> (originalArr: T[]) {
	return originalArr.map((elem) => ({ ...elem }));
}
