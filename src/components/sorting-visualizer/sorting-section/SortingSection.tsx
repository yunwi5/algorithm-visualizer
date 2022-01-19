import { useState, useEffect } from "react";
import SectionNav from "./SectionNav";
import BarList from "../../graphs/BarList";
import {
	SortingAlgorithm,
	SortingAction,
	Action,
	SortingBar
} from "../../../models/sorting-models";
import {
	createRandomSortingArray,
	MAX_BAR_HEIGHT
} from "../../../utilities/sotring-util.ts/sorting-util";
import { createDeepArrayCopy } from "../../../utilities/list-util";
import { getSortingActions } from "../../../utilities/sotring-util.ts/sorting-algo-util";
import { executeSortingAction } from "../../../utilities/sotring-util.ts/sorting-action-util";
import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import classes from "./SortingSection.module.scss";

interface Props {
	isBegin: boolean;
	arraySize: number;
	sortingSpeed: number;
	initialArray: SortingBar[];
	numberOfSections: number;
	onResetStart: () => void;
	onClose: () => void;
}

const SortingSection: React.FC<Props> = (props) => {
	const {
		arraySize,
		sortingSpeed,
		isBegin,
		initialArray,
		numberOfSections,
		onResetStart,
		onClose
	} = props;
	const initialArrayLength = initialArray.length;

	// Domain sorting algorithm
	const [ algorithm, setAlgorithm ] = useState(SortingAlgorithm.BubbleSort);

	// Sorting array & actions
	const [ sortingArray, setSortingArray ] = useState<SortingBar[]>(initialArray);
	const [ animationActions, setAnimationActions ] = useState<SortingAction[]>([]);

	// Comparisons & swaps operations counter
	const [ comparisons, setComparisons ] = useState(0);
	const [ swaps, setSwaps ] = useState(0);
	const [ timeElapsed, setTimeElapsed ] = useState<number | null>(null);

	// Randomize Internally
	function randomizeArray () {
		const newRandomArray = createRandomSortingArray(arraySize);
		setSortingArray(newRandomArray);
		setComparisons(0);
		setSwaps(0);
		setTimeElapsed(null);
		// Get new sorting animation actions
		const sortingActions = getSortingActions(newRandomArray, algorithm);
		setAnimationActions(sortingActions);
	}

	// Array size change Externally
	useEffect(
		() => {
			// Alert!
			// The reference of the Bar objects between SortingSection should not be the same.
			// Not only the copy of array, but also the deep copy of all objects are required.
			const newRandomArray = createDeepArrayCopy(initialArray);
			setSortingArray(newRandomArray);
			setComparisons(0);
			setSwaps(0);
			setTimeElapsed(null);
			// Get new sorting animation actions
			const sortingActions = getSortingActions(newRandomArray, algorithm);
			setAnimationActions(sortingActions);
		},
		[ arraySize, initialArrayLength, algorithm ]
	);

	const stopInterval = (interval: ReturnType<typeof setInterval>) => {
		clearInterval(interval);
		setAnimationActions([]);
		onResetStart();
	};

	// Execute animation action one by one.
	// Begin state change Externally
	useEffect(
		() => {
			if (!isBegin) {
				// When Start turns to false
				const sortingActions = getSortingActions(sortingArray, algorithm);
				setAnimationActions(sortingActions);
			} else if (isBegin) {
				// When Start turns to true
				setComparisons(0);
				setSwaps(0);
				const startTime = performance.now();
				let index = 0;
				let interval = setInterval(() => {
					if (index === animationActions.length) {
						stopInterval(interval);
						const finishTime = performance.now();
						setTimeElapsed(finishTime - startTime);
						return;
					}
					let action = animationActions[index];
					const newArray = executeSortingAction(sortingArray, action, algorithm);
					setSortingArray((prevArr) => newArray);

					if (action.action === Action.PEND) {
						setComparisons((prev) => prev + 1);
					} else if (action.action === Action.SWAP) {
						setSwaps((prev) => prev + 1);
					}
					index++;
				}, sortingSpeed);
			}
		},
		[ isBegin ]
	);

	const sectionSizeClass =
		numberOfSections >= 3
			? classes["section-quarter"]
			: numberOfSections === 2 ? classes["section-half"] : "";

	return (
		<section className={`${classes["sorting-section"]} ${sectionSizeClass}`}>
			<SectionNav
				algorithm={algorithm}
				isBegin={isBegin}
				onClose={onClose}
				numberOfSections={numberOfSections}
				onChangeAlgorithm={(algo: SortingAlgorithm) => setAlgorithm(algo)}
				onRandomize={randomizeArray}
			/>

			<BarList
				arraySize={arraySize}
				speed={sortingSpeed}
				barArray={sortingArray}
				maxHeight={MAX_BAR_HEIGHT}
			/>

			<div className={classes["sorting-summary"]}>
				<p>
					<span className={classes.label}>Array Size: </span>
					<span className={classes.value}>{arraySize}</span>
				</p>
				<p>
					<span className={classes.label}>Comparisons: </span>
					<span className={classes.value}>{comparisons}</span>
				</p>
				<p>
					<span className={classes.label}>Swaps: </span>
					<span className={classes.value}>{swaps}</span>
				</p>
				{timeElapsed && (
					<p className={classes.time}>
						{getTimeElapsedInFormat(timeElapsed)}s <span>taken.</span>
					</p>
				)}
			</div>
		</section>
	);
};

export default SortingSection;
