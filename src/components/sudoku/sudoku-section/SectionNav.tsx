import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import { PlayMode } from "../../../models/sudoku-model";
import classes from "./SectionNav.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/pro-solid-svg-icons";

interface Props {
	timeElapsed: number | null;
	playMode: PlayMode;
	isBegin: boolean;
	onChangeMode: (mode: PlayMode) => void;
	onRandomize: () => void;
}

const SectionNav: React.FC<Props> = (props) => {
	const { timeElapsed, playMode, isBegin, onChangeMode, onRandomize } = props;

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
			{!isBegin && (
				<FontAwesomeIcon
					icon={faRandom as any}
					onClick={onRandomize}
					className={classes.icon}
				/>
			)}
			{timeElapsed && (
				<p className={classes.message}>{getTimeElapsedInFormat(timeElapsed)}s Taken</p>
			)}
		</div>
	);
};

export default SectionNav;
