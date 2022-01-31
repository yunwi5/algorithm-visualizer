import Sidebar from "../../layout/sidebar/Sidebar";
import SudokuRangeSection from "../../graphs/graph-support/SudokuRangeSection";

import { toSortingSpeed } from "../../../utilities/calc-util";
import classes from "./SudokuNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	onChangeSpeed: (speed: number) => void;
	isBegin: boolean;
	onBegin: () => void;
	onRandomize: () => void;
}

const SudokuNav: React.FC<Props> = (props) => {
	const { onChangeSpeed, isBegin, onBegin, onRandomize } = props;

	const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		// temporary
		onChangeSpeed(toSortingSpeed(value));
	};

	return (
		<nav className={classes["sodoku-nav"]}>
			<div className={classes.heading}>
				<Sidebar />
				<h3>Sudoku Visualizer</h3>
			</div>
			<SudokuRangeSection onChangeSpeed={speedHandler} isBegin={isBegin} />
			<div className={classes.buttons}>
				<button
					onClick={onRandomize}
					className={`${classes["btn"]} ${classes["btn-fill"]}`}
				>
					Randomize
				</button>
				<button onClick={onBegin} className={`${classes["btn"]} ${classes["btn-empty"]}`}>
					Start
				</button>
				<FontAwesomeIcon className={classes["info-icon"]} icon={faCircleInfo as IconProp} />
			</div>
		</nav>
	);
};

export default SudokuNav;
