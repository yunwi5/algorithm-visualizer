import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import { PlayMode } from "../../../models/sudoku-model";
import classes from "./SectionNav.module.scss";

interface Props {
	timeElapsed: number | null;
	playMode: PlayMode;
	isBegin: boolean;
	showSolution: boolean;
	onTerminate: () => void;
	onChangeMode: (mode: PlayMode) => void;
}

const SectionNav: React.FC<Props> = (props) => {
	const { timeElapsed, playMode, isBegin, showSolution, onTerminate, onChangeMode } = props;

	return (
		<div className={classes["section-nav"]}>
			<div className={classes["btn-wrapper"]}>
				<button
					onClick={onChangeMode.bind(null, PlayMode.MACHINE)}
					className={`${classes.btn} ${playMode === PlayMode.MACHINE
						? classes["btn-active"]
						: classes["btn-inactive"]}`}
				>
					<span>Use Solver</span>
				</button>
			</div>
			<div className={classes["btn-wrapper"]}>
				<button
					onClick={onChangeMode.bind(null, PlayMode.USER)}
					className={`${classes.btn} ${playMode === PlayMode.USER
						? classes["btn-active"]
						: classes["btn-inactive"]}`}
				>
					<span>Try Yourself</span>
				</button>
			</div>
			{isBegin && (
				<button
					onClick={onTerminate}
					className={`${classes.btn} ${classes["btn-solution"]}`}
				>
					<span>Show Solution</span>
				</button>
			)}

			{timeElapsed &&
			!showSolution && (
				<p className={classes.message}>{getTimeElapsedInFormat(timeElapsed)}s Taken</p>
			)}
		</div>
	);
};

export default SectionNav;
