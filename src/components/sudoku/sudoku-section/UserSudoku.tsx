import { useState, useMemo, useLayoutEffect, useEffect } from "react";
import SudokuGrid from "../../graphs/grid/SudokuGrid";
import {
	createCustomGrid,
	cellIsValid,
	sudokuIsSolved
} from "../../../utilities/sudoku-util/sudoku-util";
import { finalizeGrid } from "../../../utilities/sudoku-util/sudoku-action-util";
import { copyBoard } from "../../../utilities/list-util";
import { CellState, PlayMode } from "../../../models/sudoku-model";

interface Props {
	grid: number[][];
	onComplete: () => void;
	onTime: (time: number | null) => void;
}

const UserSudoku: React.FC<Props> = (props) => {
	const { grid, onComplete, onTime } = props;

	const customGrid = useMemo(() => createCustomGrid(grid), [ grid ]);
	const [ currentGrid, setCurrentGrid ] = useState(customGrid);

	// User display purpose
	const [ startTime, setStartTime ] = useState<number>(0);
	// Utility purpose
	const [ updateCount, setUpdateCount ] = useState(0);

	const cellChangeHandler = (row: number, col: number, newValue: number) => {
		// timer
		if (updateCount === 0) {
			setStartTime(performance.now());
		}
		setUpdateCount((prev) => prev + 1);

		// Validation
		const isInRange = newValue > 0 && newValue < 10 ? true : false;
		const isValidSudokuCell = cellIsValid(currentGrid, row, col, newValue); // Call a function for sudoku validation
		const isValid = isInRange && isValidSudokuCell;

		let newCell;
		if (newValue === 0) {
			newCell = { value: newValue, status: CellState.INITIAL };
		} else if (isValid) {
			newCell = { value: newValue, status: CellState.VALID };
		} else {
			newCell = { value: newValue, status: CellState.INVALID };
		}
		const currentGridCpy = [ ...currentGrid ];
		currentGridCpy[row][col] = newCell;
		setCurrentGrid(currentGridCpy);
	};

	useEffect(
		() => {
			// Check if the user successfully filled all the cells.
			const isSolved = sudokuIsSolved(currentGrid);
			if (!isSolved) return;
			onComplete();

			const endTime = performance.now();
			console.log("start time:", startTime, "end time:", endTime);
			const timeTaken = endTime - startTime;
			onTime(timeTaken);

			const gridCpy = copyBoard(currentGrid);
			finalizeGrid(gridCpy);
			setCurrentGrid(gridCpy);
		},
		[ updateCount ]
	);

	return (
		<SudokuGrid grid={currentGrid} playMode={PlayMode.USER} onChangeCell={cellChangeHandler} />
	);
};

export default UserSudoku;
