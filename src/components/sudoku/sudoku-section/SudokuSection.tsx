import { useState, useEffect, useCallback } from "react";
import SectionNav from "./SectionNav";
import { PlayMode } from "../../../models/sudoku-model";
import UserSudoku from "./UserSudoku";
import SudokuSolver from "./SudokuSolver";
import classes from "./SudokuSection.module.scss";

interface Props {
	isBegin: boolean;
	speed: number;
	grid: number[][];
	onComplete: () => void;
}

const SudokuSection: React.FC<Props> = (props) => {
	const { isBegin, speed, grid, onComplete } = props;
	const [ playMode, setPlayMode ] = useState(PlayMode.MACHINE);
	// User message
	const [ timeElapsed, setTimeElapsed ] = useState<number | null>(null);

	const changeModeHandler = (newMode: PlayMode) => {
		setPlayMode(newMode);
		setTimeElapsed(null);
	};

	const timeDisplayHandler = (time: number | null) => {
		setTimeElapsed(time);
	};

	console.log("Is begin:", isBegin);

	return (
		<section className={classes["sudoku-section"]}>
			<SectionNav
				isBegin={isBegin}
				timeElapsed={timeElapsed}
				playMode={playMode}
				onChangeMode={changeModeHandler}
			/>
			{playMode === PlayMode.MACHINE ? (
				<SudokuSolver
					isBegin={isBegin}
					speed={speed}
					grid={grid}
					onComplete={onComplete}
					onTime={timeDisplayHandler}
				/>
			) : (
				<UserSudoku grid={grid} onComplete={onComplete} onTime={timeDisplayHandler} />
			)}
		</section>
	);
};

export default SudokuSection;
