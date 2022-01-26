import { SortingAlgorithm } from "./sorting-models";

// Sorting Algorithm Modal
export interface AlgorithmInfo {
	name: SortingAlgorithm;
	about: string;
	timeComplexity: {
		bestCase: string;
		averageCase: string;
		worstCase: string;
	};
	spaceComplexity: string;
}

export const sortingAlgorithmsInfoList: AlgorithmInfo[] = [
	{
		name: SortingAlgorithm.QuickSort,
		about:
			"QuickSort, like the name suggests, is one of the fatest sorting algorithm that is commonly used in practice.",
		timeComplexity: {
			bestCase: "n log(n)",
			averageCase: "n long(n)",
			worstCase: "n^2"
		},
		spaceComplexity: "log(n)"
	},
	{
		name: SortingAlgorithm.MergeSort,
		about:
			"MergeSort, popular Divide-And-Conquer algorithm that splits the array into smaller and smaller subarrays, and then merge them afterwards. This algorithm have an optimal time complexity in any cases.",
		timeComplexity: {
			bestCase: "n log(n)",
			averageCase: "n long(n)",
			worstCase: "n long(n)"
		},
		spaceComplexity: "n"
	},
	{
		name: SortingAlgorithm.SelectionSort,
		about:
			"SelectionSort is not an ideal sorting algorithm due to its consistently bad time complexity. However, it is a relatively simple algorithm to implement, and easy to understand.",
		timeComplexity: {
			bestCase: "n^2",
			averageCase: "n^2",
			worstCase: "n^2"
		},
		spaceComplexity: "1"
	},
	{
		name: SortingAlgorithm.InsertionSort,
		about:
			"InsertionSort generally has bad performance among sorting algorithms, but it runs in the best possible time when the array is pre-sorted!",
		timeComplexity: {
			bestCase: "n",
			averageCase: "n^2",
			worstCase: "n^2"
		},
		spaceComplexity: "1"
	},
	{
		name: SortingAlgorithm.BubbleSort,
		about:
			"BubbleSort consistently has a bad time complexity in all cases. Even worse, it requires too many swaps operations compared to other sorting algorithms. But it is easy to implement.",
		timeComplexity: {
			bestCase: "n^2",
			averageCase: "n^2",
			worstCase: "n^2"
		},
		spaceComplexity: "1"
	},
	{
		name: SortingAlgorithm.HeapSort,
		about:
			"HeapSort, unlike other algorithms that start sorting process immediately, it constructs BinaryHeap (data structure) first and then shift the elements down to the sorted positions. It has an optimal time complexity in all cases.",
		timeComplexity: {
			bestCase: "n log(n)",
			averageCase: "n log(n)",
			worstCase: "n log(n)"
		},
		spaceComplexity: "1"
	}
];

export function getAlgorithmInfo (algorithm: SortingAlgorithm) {
	return (
		sortingAlgorithmsInfoList.find((algoObj) => algoObj.name === algorithm) ||
		sortingAlgorithmsInfoList[0]
	);
}
