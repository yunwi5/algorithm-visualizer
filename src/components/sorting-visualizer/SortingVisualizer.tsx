import React, { useState, useEffect } from "react";
import SortingNav from "./sorting-nav/SortingNav";
import SortingSection from "./sorting-section/SortingSection";
import { Bar } from "../../models/sorting-models";
import { createRandomSortingArray } from "../../utilities/sotring-util.ts/sorting-util";
import classes from "./SortingVisualizer.module.scss";

export const DEFAULT_ARR_SIZE = 20;
export const DEFAULT_SORTING_SPEED = 10;
export const MIN_SPEED = 500; // 500ms per operation
export const MAX_SPEED = 1; // 5ms per operation

export const MAXIMUM_NUMBER_OF_SECTIONS = 4;

const SortingVisualizer: React.FC = () => {
	const [ arraySize, setArraySize ] = useState(DEFAULT_ARR_SIZE);
	const [ sortingSpeed, setSortingSpeed ] = useState(DEFAULT_SORTING_SPEED);

	// Initial array and Sections management
	const [ initialArray, setInitialArray ] = useState<Bar[]>([]);
	const [ showSections, setShowSections ] = useState<boolean[]>([ true, false, false, false ]);
	const numSections = showSections.reduce((prev, curr) => prev + (curr ? 1 : 0), 0);

	// Start and finish point management
	const [ isBegin, setIsBegin ] = useState(false);
	const [ firstCompleted, setFirstCompleted ] = useState(false);
	const [ secondCompleted, setSecondCompleted ] = useState(false);
	const [ thirdCompleted, setThirdCompleted ] = useState(false);
	const [ fourthCompleted, setFourthCompleted ] = useState(false);

	function sortingSectionsHandler () {
		// if (!showSections.includes(false)) return;
		const secs = [ ...showSections ];
		const falseIndex = secs.findIndex((bool) => !bool);
		secs[falseIndex] = true;
		console.log("sections:", secs);
		setShowSections(secs);
	}

	function closeSectionHandler (index: number) {
		const newShowSections = [ ...showSections ];
		newShowSections[index] = false;
		setShowSections(newShowSections);
	}

	function startHandler (isBegin: boolean) {
		setIsBegin(isBegin);
		setFirstCompleted(false);
		setSecondCompleted(false);
		setThirdCompleted(false);
		setFourthCompleted(false);
	}

	function resetStart (index: number) {
		if (index === 0) {
			setFirstCompleted(true);
		} else if (index === 1) {
			setSecondCompleted(true);
		} else if (index === 2) {
			setThirdCompleted(true);
		} else {
			setFourthCompleted(true);
		}
	}

	useEffect(
		() => {
			const newArray = createRandomSortingArray(arraySize);
			setInitialArray(newArray);
		},
		[ arraySize ]
	);

	useEffect(
		() => {
			const total = +firstCompleted + +secondCompleted + +thirdCompleted + +fourthCompleted;
			console.log("total completed:", total);
			if (total >= numSections) {
				setIsBegin(false);
			}
		},
		[ firstCompleted, secondCompleted, thirdCompleted, fourthCompleted ]
	);

	const sectionContainerClass =
		numSections >= 3
			? classes["container-quarter"]
			: numSections === 2 ? classes["container-half"] : "";

	return (
		<main className={classes["sorting-visualizer"]}>
			<SortingNav
				isBegin={isBegin}
				onChangeArraySize={(size: number) => setArraySize(size)}
				onChangeSortingSpeed={(speed: number) => setSortingSpeed(speed)}
				onChangeStart={startHandler}
				onAddSection={sortingSectionsHandler}
				numberOfSections={numSections}
			/>
			<div className={`${classes["sections-container"]} ${sectionContainerClass}`}>
				{showSections.map(
					(bool, idx) =>
						bool && (
							<SortingSection
								key={idx}
								isBegin={isBegin}
								arraySize={arraySize}
								sortingSpeed={sortingSpeed}
								initialArray={initialArray}
								onResetStart={resetStart.bind(null, idx)}
								onClose={closeSectionHandler.bind(null, idx)}
								numberOfSections={numSections}
							/>
						)
				)}
			</div>
		</main>
	);
};

export default SortingVisualizer;
