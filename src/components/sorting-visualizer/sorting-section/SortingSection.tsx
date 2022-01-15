import { useState, useEffect } from "react";
import SectionNav from "./SectionNav";
import SortingBar from "./SortingBar";
import { SortingAlgorithm, SortingAction, Action, Bar } from "../../../models/sorting-models";
import { createRandomSortingArray } from "../../../utilities/sotring-util.ts/sorting-util";
import { createDeepArrayCopy } from "../../../utilities/list-util";
import { getSortingActions } from "../../../utilities/sotring-util.ts/sorting-algo-util";
import { executeSortingAction } from "../../../utilities/sotring-util.ts/sorting-action-util";
import classes from "./SortingSection.module.scss";

interface Props {
	isBegin: boolean;
	arraySize: number;
	sortingSpeed: number;
	initialArray: Bar[];
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

	// Sorting
	const [ sortingArray, setSortingArray ] = useState<Bar[]>(initialArray);
	const [ animationActions, setAnimationActions ] = useState<SortingAction[]>([]);

	// Comparisons & Swaps operations counter
	const [ comparisons, setComparisons ] = useState(0);
	const [ swaps, setSwaps ] = useState(0);

	// Randomize Internally
	function randomizeArray () {
		const newRandomArray = createRandomSortingArray(arraySize);
		setSortingArray(newRandomArray);
		setComparisons(0);
		setSwaps(0);
		// Moved
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
			// Moved
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

				let index = 0;
				let interval = setInterval(() => {
					if (index === animationActions.length) {
						stopInterval(interval);
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
			<div className={classes["bar-container"]}>
				{sortingArray.map((bar, idx) => (
					<SortingBar key={idx} arraySize={arraySize} bar={bar} />
				))}
			</div>

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
			</div>
		</section>
	);
};

export default SortingSection;
