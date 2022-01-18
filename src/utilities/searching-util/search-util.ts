import { SearchBar, SearchBarState } from "../../models/search-model";

export function createRandomSearchArray (arrSize: number, min: number, max: number) {
	const randomArr: SearchBar[] = [];
	for (let i = 0; i < arrSize; i++) {
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		randomArr.push({
			value: randomNum,
			status: SearchBarState.INITIAL
		});
	}

	return randomArr.sort((barA, barB) => barA.value - barB.value);
}
