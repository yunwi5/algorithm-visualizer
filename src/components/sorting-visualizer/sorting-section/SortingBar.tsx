import { useState, useEffect } from "react";
import { Bar, BarState } from "../../../models/sorting-models";
import { getBarFontSize, MAX_BAR_HEIGHT } from "../../../utilities/sotring-util.ts/sorting-util";
import "./SortingBar.scss";

interface Props {
	arraySize: number;
	bar: Bar;
}

const SortingBar: React.FC<Props> = ({ arraySize, bar }) => {
	const { value, status } = bar;
	const [ barStatus, setBarStatus ] = useState(status);

	// Dynamic Styling
	const outerStyle = {
		width: `${1 / arraySize * 100}%`
	};

	const innerStyle = {
		height: `${value / MAX_BAR_HEIGHT * 100}%`,
		fontSize: `${getBarFontSize(arraySize)}%`
	};

	// Bar animation effect
	useEffect(
		() => {
			setBarStatus(status);
			// Once the bar reaches its FINAL state, re-initialize its state after 1.5 sec
			let timer = setTimeout(() => {
				if (status !== BarState.FINAL) return;
				setBarStatus(BarState.INITIAL);
			}, 1500);

			return () => clearTimeout(timer);
		},
		[ status ]
	);

	return (
		<div className="sorting-bar" style={outerStyle}>
			<div style={innerStyle} className={`inner-bar bar-${barStatus}`}>
				{arraySize < 50 && value}
			</div>
		</div>
	);
};

export default SortingBar;
