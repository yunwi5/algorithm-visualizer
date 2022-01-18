import { useState, useEffect } from "react";
import SearchSection from "./search-section/SearchSection";
import SearchNav from "./search-nav/SearchNav";
import UserControl from "./search-nav/UserControl";
import { DEFAULT_SPEED, DEFAULT_ARR_SIZE } from "../../utilities/calc-util";
import { createRandomSearchArray } from "../../utilities/searching-util/search-util";
import classes from "./SearchVisualizer.module.scss";

const SearchVisualizer: React.FC = () => {
	const [ speed, setSpeed ] = useState(DEFAULT_SPEED);
	const [ arraySize, setArraySize ] = useState(DEFAULT_ARR_SIZE);
	const [ isDuo, setIsDuo ] = useState(false);

	const [ target, setTarget ] = useState(50);
	const [ minNumber, setMinNumber ] = useState(1);
	const [ maxNumber, setMaxNumber ] = useState(100);

	const initialArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
	const [ searchArray, setSearchArray ] = useState(initialArray);

	const [ isBegin, setIsBegin ] = useState(false);
	const [ firstCompleted, setFirstCompleted ] = useState(false);
	const [ secondCompleted, setSecondCompleted ] = useState(false);

	// console.log(`speed: ${speed}, arr size: ${arraySize}`);

	function randomizeArray () {
		const newArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
		setSearchArray(newArray);
	}

	function startHandler () {
		setIsBegin(true);
		setFirstCompleted(false);
		setSecondCompleted(false);
	}

	function reset (index: number) {
		if (index === 0) {
			setFirstCompleted(true);
		} else if (index === 1) {
			setSecondCompleted(true);
		}
	}

	useEffect(
		() => {
			const newArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
			setSearchArray(newArray);
		},
		[ arraySize, minNumber, maxNumber ]
	);

	useEffect(
		() => {
			if (!isDuo && firstCompleted) {
				setIsBegin(false);
			}
			if (isDuo && firstCompleted && secondCompleted) {
				setIsBegin(false);
			}
		},
		[ firstCompleted, secondCompleted ]
	);

	return (
		<main className={classes["search-visualizer"]}>
			<SearchNav
				onChangeSize={(newSize: number) => setArraySize(newSize)}
				onChangeSpeed={(newSpeed: number) => setSpeed(newSpeed)}
				onChangeDuo={() => setIsDuo((prev) => !prev)}
				onRandomize={randomizeArray}
				isBegin={isBegin}
			/>
			<div className={classes.content}>
				{!isBegin && (
					<UserControl
						onChangeTarget={(t: number) => setTarget(t)}
						onChangeMin={(min: number) => setMinNumber(min)}
						onChangeMax={(max: number) => setMaxNumber(max)}
						onBegin={startHandler}
					/>
				)}
				<div className={classes.sections}>
					<SearchSection
						isBegin={isBegin}
						target={target}
						speed={speed}
						arraySize={arraySize}
						initialArray={searchArray}
						maxHeight={maxNumber}
						onReset={() => reset(0)}
					/>
					{isDuo && (
						<SearchSection
							isBegin={isBegin}
							target={target}
							speed={speed}
							arraySize={arraySize}
							initialArray={searchArray}
							maxHeight={maxNumber}
							onReset={() => reset(1)}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default SearchVisualizer;
