import Sidebar from "../../layout/sidebar/Sidebar";
import SudokuRangeSection from "../../graphs/graph-support/SudokuRangeSection";
import ToggleBar from "../../ui/ToggleBar";

import { Theme } from "../../../models/gen-model";
import { toSortingSpeed } from "../../../utilities/calc-util";
import classes from "./SudokuNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	isBegin: boolean;
	onChangeSpeed: (speed: number) => void;
	onBegin: () => void;
	onRandomize: () => void;
	onDuoToggle: () => void;
}

const SudokuNav: React.FC<Props> = (props) => {
	const { onChangeSpeed, isBegin, onBegin, onRandomize, onDuoToggle } = props;

	const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		// temporary
		onChangeSpeed(toSortingSpeed(value) / 3);
	};

	return (
		<nav className={classes["sodoku-nav"]}>
			<div className={classes.heading}>
				<Sidebar />
				<h3>Sudoku Visualizer</h3>
			</div>
			<div className={classes.controls}>
				<SudokuRangeSection onChangeSpeed={speedHandler} isBegin={isBegin} />
				<ToggleBar onChange={onDuoToggle} isBegin={isBegin} theme={Theme.PRIMARY} />
			</div>
			<div className={classes.buttons}>
				<button
					onClick={onRandomize}
					className={`${classes["btn"]} ${classes["btn-fill"]}`}
					disabled={isBegin}
				>
					Randomize
				</button>
				<button
					onClick={onBegin}
					className={`${classes["btn"]} ${classes["btn-empty"]}`}
					disabled={isBegin}
				>
					Start
				</button>
				<FontAwesomeIcon className={classes["info-icon"]} icon={faCircleInfo as any} />
			</div>
		</nav>
	);
};

export default SudokuNav;
