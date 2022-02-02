import Sidebar from "../../layout/sidebar/Sidebar";
import SudokuRangeSection from "../../graphs/graph-support/SudokuRangeSection";
import ToggleBar from "../../ui/ToggleBar";

import { toSortingSpeed } from "../../../utilities/calc-util";
import { Theme } from "../../../models/gen-model";
import classes from "./SudokuNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	onChangeSpeed: (speed: number) => void;
	isBegin: boolean;
	onBegin: () => void;
	onRandomize: () => void;
	onDuoToggle: () => void;
}

const SudokuNav: React.FC<Props> = (props) => {
	const { onChangeSpeed, isBegin, onBegin, onRandomize, onDuoToggle } = props;

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
			<ToggleBar onChange={onDuoToggle} isBegin={isBegin} theme={Theme.PRIMARY} />
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
				<FontAwesomeIcon className={classes["info-icon"]} icon={faCircleInfo as IconProp} />
			</div>
		</nav>
	);
};

export default SudokuNav;
