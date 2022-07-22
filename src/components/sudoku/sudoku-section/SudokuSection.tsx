import { useState, useEffect } from "react";
import SectionNav from "./SectionNav";
import SudokuSolver from "./SudokuSolver";
import UserSudoku from "./UserSudoku";
import { PlayMode } from "../../../models/sudoku-model";
import { getRandomGrid } from "../../../utilities/sudoku-util/create-sudoku-util";
import classes from "./SudokuSection.module.scss";

interface Props {
	isBegin: boolean;
	speed: number;
	initialGrid: number[][];
	onComplete: () => void;
}

const SudokuSection: React.FC<Props> = (props) => {
	const { isBegin, speed, initialGrid, onComplete } = props;

	const [ grid, setGrid ] = useState(initialGrid);
	const [ playMode, setPlayMode ] = useState(PlayMode.MACHINE);
	// User message
	const [ timeElapsed, setTimeElapsed ] = useState<number | null>(null);

	const randomGridHandler = () => {
		console.log("randomize grid");
		const newGrid = getRandomGrid();
		setGrid(newGrid);
	};

	const changeModeHandler = (newMode: PlayMode) => {
		setPlayMode(newMode);
		setTimeElapsed(null);
	};

	const timeDisplayHandler = (time: number | null) => {
		setTimeElapsed(time);
	};

	// When the global sudoku grid changes, its section should change accordingly
	useEffect(
		() => {
			setGrid(initialGrid);
		},
		[ initialGrid ]
	);

	return (
		<section className={classes["sudoku-section"]}>
			<SectionNav
				isBegin={isBegin}
				timeElapsed={timeElapsed}
				playMode={playMode}
				onChangeMode={changeModeHandler}
				onRandomize={randomGridHandler}
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
