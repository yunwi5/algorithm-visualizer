import { useState, useEffect } from "react";
import { SortingBar, BarState } from "../../models/sorting-models";
import { SearchBar, SearchBarState } from "../../models/search-model";
import { getBarFontSize } from "../../utilities/sotring-util.ts/sorting-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowAltDown } from "@fortawesome/pro-regular-svg-icons";
import "./Bar.scss";

interface Props {
	arraySize: number;
	bar: SortingBar | SearchBar;
	speed: number;
	maxHeight: number;
}

function barIsFinal (barState: BarState | SearchBarState) {
	return barState.toLowerCase().includes("final");
}

function barIsValidFinal (barState: BarState | SearchBarState) {
	return barState === SearchBarState.FINAL_VALID;
}

function barHasArrowPointer (barState: BarState | SearchBarState) {
	return barState.toLocaleLowerCase().includes("point");
}

const Bar: React.FC<Props> = (props) => {
	const { arraySize, bar, speed, maxHeight } = props;

	const { value, status } = bar;
	const [ barStatus, setBarStatus ] = useState(status);

	// Dynamic Styling
	const outerStyle = {
		width: `${1 / arraySize * 100}%`
	};

	const innerStyle = {
		height: `${value / maxHeight * 100}%`,
		fontSize: `${getBarFontSize(arraySize)}%`,
		transition: `height ${speed / 1000}s ease`
	};

	useEffect(
		() => {
			setBarStatus(status);
			// Once the bar reaches its FINAL state, re-initialize its state after 1.5 sec
			// If the bar is valid-final in search algorithm, do not reset the color.
			if (!barIsFinal(status) || barIsValidFinal(status)) return;
			let timer = setTimeout(() => {
				setBarStatus(BarState.INITIAL);
			}, 1500);

			return () => clearTimeout(timer);
		},
		[ status ]
	);

	const addArrow = barHasArrowPointer(status);
	console.log("has arrow:", addArrow);

	return (
		<div className="sorting-bar" style={outerStyle}>
			{addArrow && (
				<div className="icon">
					<FontAwesomeIcon icon={faLongArrowAltDown as IconProp} />
				</div>
			)}
			<div style={innerStyle} className={`inner-bar bar-${barStatus}`}>
				{arraySize < 50 && value}
			</div>
		</div>
	);
};

export default Bar;
