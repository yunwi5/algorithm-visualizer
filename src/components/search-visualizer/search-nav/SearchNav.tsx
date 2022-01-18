import { useRef, useLayoutEffect } from "react";
import RangeSection from "../../graphs/graph-support/RangeSection";
import ToggleBar from "../../ui/ToggleBar";
import { toMsSpeed } from "../../../utilities/calc-util";

import classes from "./SearchNav.module.scss";

interface Props {
	onChangeSpeed: (speed: number) => void;
	onChangeSize: (size: number) => void;
	onChangeDuo: () => void;
	onRandomize: () => void;
	isBegin: boolean;
}

const SearchNav: React.FC<Props> = (props) => {
	const { onChangeSpeed, onChangeSize, onChangeDuo, onRandomize, isBegin } = props;

	const btnRef = useRef<HTMLButtonElement>(null);

	function speedChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const speed = toMsSpeed(+e.target.value);
		onChangeSpeed(speed);
	}

	function sizeChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const newSize = parseInt(e.target.value);
		onChangeSize(newSize);
	}

	function displayDuoHandler (e: React.ChangeEvent<HTMLInputElement>) {
		onChangeDuo();
	}

	useLayoutEffect(
		() => {
			if (isBegin && btnRef.current) {
				btnRef.current.disabled = true;
				console.log("btn disabled:", btnRef.current.disabled);
			} else if (btnRef.current) {
				btnRef.current.disabled = false;
				console.log("btn disabled:", btnRef.current.disabled);
			}
		},
		[ isBegin ]
	);

	return (
		<nav className={classes.nav}>
			<h2>Search Visualizer</h2>
			<div className={classes.controls}>
				<RangeSection
					onChangeSpeed={speedChangeHandler}
					onChangeSize={sizeChangeHandler}
					colorSecondary={true}
					isBegin={isBegin}
				/>
				<ToggleBar onChange={displayDuoHandler} isBegin={isBegin} />
				<button ref={btnRef} onClick={onRandomize}>
					Randomize
				</button>
			</div>
		</nav>
	);
};

export default SearchNav;
