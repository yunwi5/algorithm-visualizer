import { useState } from "react";
import SudokuNav from "./sudoku-nav/SudokuNav";
import SudokuSection from "./sudoku-section/SudokuSection";
import { DEFAULT_SPEED } from "../../utilities/calc-util";
import { getRandomGrid } from "../../utilities/sudoku-util/create-sudoku-util";
import classes from "./SudokuMain.module.scss";

const Grid = [
	[ 7, 8, 0, 4, 0, 0, 1, 2, 0 ],
	[ 6, 0, 0, 0, 7, 5, 0, 0, 9 ],
	[ 0, 0, 0, 6, 0, 1, 0, 7, 8 ],
	[ 0, 0, 7, 0, 4, 0, 2, 6, 0 ],
	[ 0, 0, 1, 0, 5, 0, 9, 3, 0 ],
	[ 9, 0, 4, 0, 6, 0, 0, 0, 5 ],
	[ 0, 7, 0, 3, 0, 0, 0, 1, 2 ],
	[ 1, 2, 0, 0, 0, 7, 4, 0, 0 ],
	[ 0, 4, 9, 2, 0, 6, 0, 0, 7 ]
];

const SudokuMain: React.FC = () => {
	const [ isBegin, setIsBegin ] = useState(false);
	const [ speed, setSpeed ] = useState(DEFAULT_SPEED);
	const [ grid, setGrid ] = useState<number[][]>(Grid);

	const randomizeGrid = () => {
		// One grid at the moment
		const newGrid = getRandomGrid();
		console.log("got new grid");
		console.table(newGrid);
		setGrid(newGrid);
	};

	return (
		<main className={classes["sudoku-main"]}>
			<SudokuNav
				onChangeSpeed={(speed: number) => setSpeed(speed)}
				isBegin={isBegin}
				onBegin={() => setIsBegin(true)}
				onRandomize={randomizeGrid}
			/>
			<SudokuSection
				isBegin={isBegin}
				speed={speed}
				grid={grid}
				onComplete={() => setIsBegin(false)}
			/>
		</main>
	);
};

export default SudokuMain;
