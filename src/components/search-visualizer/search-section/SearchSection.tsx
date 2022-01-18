import { useState, useEffect } from "react";
import {
	SearchBar,
	SearchAlgorithm,
	SearchAction,
	ActionState
} from "../../../models/search-model";
import BarList from "../../graphs/BarList";
import SearchSelect from "./SearchSelect";
import { getSearchActions } from "../../../utilities/searching-util/search-algo-util";
import { executeSearchAction } from "../../../utilities/searching-util/search-action-util";
import { createDeepArrayCopy } from "../../../utilities/list-util";
import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import classes from "./SearchSection.module.scss";

interface Props {
	isBegin: boolean;
	initialArray: SearchBar[];
	target: number;
	speed: number;
	arraySize: number;
	maxHeight: number;
	onReset: () => void;
}

const SearchSection: React.FC<Props> = (props) => {
	const { isBegin, initialArray, target, speed, arraySize, maxHeight, onReset } = props;

	const [ searchArray, setSearchArray ] = useState(createDeepArrayCopy(initialArray));
	const [ algorithm, setAlgorithm ] = useState(SearchAlgorithm.BINARY_SEARCH);
	const [ animationActions, setAnimationActions ] = useState<SearchAction[]>([]);

	const [ userMessage, setUserMessage ] = useState<string | null>(null);
	const [ timeTaken, setTimeTaken ] = useState<number | null>(null);

	useEffect(
		() => {
			const newArray = createDeepArrayCopy(initialArray);
			setSearchArray(newArray);
			const newSearchActions = getSearchActions(newArray, algorithm, target);
			setAnimationActions(newSearchActions);
			setUserMessage(null);
		},
		[ algorithm, initialArray, target ]
	);

	function stopInterval (interval: ReturnType<typeof setInterval>) {
		clearInterval(interval);
		setAnimationActions([]);
		onReset();
	}

	useEffect(
		() => {
			if (!isBegin) {
				const newSearchActions = getSearchActions(searchArray, algorithm, target);
				setAnimationActions(newSearchActions);
			} else if (isBegin) {
				const startTIme = performance.now();
				let index = 0;
				let interval = setInterval(() => {
					if (index >= animationActions.length) {
						stopInterval(interval);
						const finishTime = performance.now();
						setTimeTaken(finishTime - startTIme);
						return;
					}
					const action = animationActions[index];
					const newArray = executeSearchAction(searchArray, action, algorithm);
					setSearchArray((prev) => newArray);

					if (action.action === ActionState.FINAL_VALID) {
						setUserMessage(`Target found at index ${action.current}!`);
					} else if (action.action === ActionState.FINAL_INVALID) {
						setUserMessage("Not Found!");
					}
					index++;
				}, speed);
			}
		},
		[ isBegin ]
	);

	const sectionClass = isBegin ? classes["section-long"] : "";

	return (
		<section className={`${classes["search-section"]} ${sectionClass}`}>
			<SearchSelect
				algorithm={algorithm}
				onChangeAlgorithm={(newAlgo: SearchAlgorithm) => setAlgorithm(newAlgo)}
			/>
			{userMessage && (
				<p>
					<span>{getTimeElapsedInFormat(timeTaken || 1)}s taken.</span> &ensp;{" "}
					{userMessage}
				</p>
			)}
			<BarList
				speed={speed}
				arraySize={arraySize}
				barArray={searchArray}
				maxHeight={maxHeight}
			/>
		</section>
	);
};

export default SearchSection;
