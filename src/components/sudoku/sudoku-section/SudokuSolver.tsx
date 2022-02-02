import { useState, useMemo, useEffect } from "react";
import SudokuGrid from "../../graphs/grid/SudokuGrid";
import { SudokuAction, SudokuCell } from "../../../models/sudoku-model";
import { createCustomGrid } from "../../../utilities/sudoku-util/sudoku-util";
import { executeSudokuAction } from "../../../utilities/sudoku-util/sudoku-action-util";
import { getSudokuActions } from "../../../utilities/sudoku-util/sudoku-algo-util";
import { PlayMode } from "../../../models/sudoku-model";

interface Props {
	isBegin: boolean;
	speed: number;
	grid: number[][];
	showSolution: boolean;
	onComplete: () => void;
	onTime: (time: number | null) => void;
}

const SudokuSolver: React.FC<Props> = (props) => {
	const { grid, onComplete, isBegin, speed, onTime, showSolution } = props;

	const customGrid = useMemo(() => createCustomGrid(grid), [ grid ]);
	const [ currentGrid, setCurrentGrid ] = useState(customGrid);
	const [ solutionGrid, setSolutionGrid ] = useState<SudokuCell[][]>([]);
	const [ actionsArray, setActionsArray ] = useState<SudokuAction[]>([]);

	useEffect(
		() => {
			const customGrid = createCustomGrid(grid);
			setCurrentGrid(customGrid);
			const { actions, solution } = getSudokuActions(customGrid);
			setActionsArray(actions);
			setSolutionGrid(solution);
			console.log("solution:", solution);
			onTime(null);
		},
		[ grid ]
	);

	const finishActions = (interval: ReturnType<typeof setInterval>) => {
		clearInterval(interval);
		onComplete();
	};

	useEffect(
		() => {
			if (!isBegin) {
				return;
			} else {
				let index = 0,
					n = actionsArray.length;
				const startTime = performance.now();
				const interval = setInterval(() => {
					if (index > n - 1) {
						finishActions(interval);
						const endTime = performance.now();
						onTime(endTime - startTime);
						return;
					}
					const newGrid = executeSudokuAction(currentGrid, actionsArray[index]);
					setCurrentGrid((prevGrid) => newGrid);
					index++;
				}, speed);
			}
		},
		[ isBegin ]
	);

	const gridToDisplay = showSolution ? solutionGrid : currentGrid;

	return <SudokuGrid grid={gridToDisplay} playMode={PlayMode.MACHINE} />;
};

export default SudokuSolver;
