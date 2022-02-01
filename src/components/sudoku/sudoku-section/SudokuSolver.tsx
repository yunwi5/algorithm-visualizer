import { useState, useMemo, useEffect } from "react";
import SudokuGrid from "../../graphs/grid/SudokuGrid";
import { SudokuAction } from "../../../models/sudoku-model";
import { createCustomGrid } from "../../../utilities/sudoku-util/sudoku-util";
import { executeSudokuAction } from "../../../utilities/sudoku-util/sudoku-action-util";
import { getSudokuActions } from "../../../utilities/sudoku-util/sudoku-algo-util";
import { PlayMode } from "../../../models/sudoku-model";

interface Props {
	isBegin: boolean;
	resetToggle: boolean;
	speed: number;
	grid: number[][];
	onComplete: () => void;
	onTime: (time: number | null) => void;
}

const SudokuSolver: React.FC<Props> = (props) => {
	const { grid, resetToggle, onComplete, isBegin, speed, onTime } = props;

	const customGrid = useMemo(() => createCustomGrid(grid), [ grid ]);
	const [ currentGrid, setCurrentGrid ] = useState(customGrid);
	const [ actionsArray, setActionsArray ] = useState<SudokuAction[]>([]);

	useEffect(
		() => {
			const customGrid = createCustomGrid(grid);
			setCurrentGrid(customGrid);
			const newActions = getSudokuActions(customGrid);
			setActionsArray(newActions);
			onTime(null);
		},
		[ grid, resetToggle ]
	);

	const finishActions = (interval: ReturnType<typeof setInterval>) => {
		console.log("finish!");
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
					// console.log("new grid");
					// console.table(newGrid);
					setCurrentGrid((prevGrid) => newGrid);
					index++;
				}, speed);
			}
		},
		[ isBegin ]
	);

	return <SudokuGrid grid={currentGrid} playMode={PlayMode.MACHINE} />;
};

export default SudokuSolver;
