import { useState } from "react";
import SectionNav from "./SectionNav";
import SudokuGrid from "../../graphs/grid/SudokuGrid";
import { SudokuAction } from "../../../models/sudoku-model";
import { createCustomGrid } from "../../../utilities/sudoku-util/sudoku-util";
import { executeSudokuAction } from "../../../utilities/sudoku-util/sudoku-action-util";
import { getSudokuActions } from "../../../utilities/sudoku-util/sudoku-algo-util";
import { PlayMode } from "../../../models/sudoku-model";
import UserSudoku from "./UserSudoku";
import SudokuSolver from "./SudokuSolver";
import classes from "./SudokuSection.module.scss";

interface Props {
	isBegin: boolean;
	resetToggle: boolean;
	speed: number;
	grid: number[][];
	onComplete: () => void;
}

const SudokuSection: React.FC<Props> = (props) => {
	const { isBegin, resetToggle, speed, grid, onComplete } = props;
	const [ playMode, setPlayMode ] = useState(PlayMode.MACHINE);
	// User message
	const [ timeElapsed, setTimeElapsed ] = useState<number | null>(null);

	return (
		<section className={classes["sudoku-section"]}>
			<SectionNav
				timeElapsed={timeElapsed}
				playMode={playMode}
				onChangeMode={(newMode: PlayMode) => setPlayMode(newMode)}
			/>
			{playMode === PlayMode.MACHINE ? (
				<SudokuSolver
					isBegin={isBegin}
					resetToggle={resetToggle}
					speed={speed}
					grid={grid}
					onComplete={onComplete}
					onTime={(time: number | null) => setTimeElapsed(time)}
				/>
			) : (
				<UserSudoku
					grid={grid}
					onComplete={onComplete}
					onTime={(time: number | null) => setTimeElapsed(time)}
				/>
			)}
		</section>
	);
};

export default SudokuSection;
