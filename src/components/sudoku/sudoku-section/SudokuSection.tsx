import { useState, useMemo, useEffect } from "react";
import SectionNav from "./SectionNav";
import SudokuGrid from "../../graphs/grid/SudokuGrid";
import { SudokuCell, CellState, SudokuAction } from "../../../models/sudoku-model";
import { executeSudokuAction } from "../../../utilities/sudoku-util/sudoku-action-util";
import { getSudokuActions } from "../../../utilities/sudoku-util/sudoku-algo-util";
import classes from "./SudokuSection.module.scss";

interface Props {
	isBegin: boolean;
	resetToggle: boolean;
	speed: number;
	grid: number[][];
	onComplete: () => void;
}

function createCustomGrid (grid: number[][]) {
	const gridCells: SudokuCell[][] = [];

	for (const row of grid) {
		const rowCells: SudokuCell[] = [];

		for (const value of row) {
			let cell;
			if (value === 0) cell = { value, status: CellState.INITIAL };
			else cell = { value, status: CellState.FIXED };
			rowCells.push(cell);
		}
		gridCells.push(rowCells);
	}

	return gridCells;
}

function printGrid (grid: SudokuCell[][]) {
	for (const row of grid) {
		const formattedRow = row.map((cell) => `${cell.value} (${cell.status})`);
		const line = formattedRow.join(" | ");
		console.log(line);
	}
}

export enum PlayMode {
	MACHINE = "machine",
	USER = "user"
}

const SudokuSection: React.FC<Props> = (props) => {
	const { isBegin, resetToggle, speed, grid, onComplete } = props;
	const customGrid = useMemo(() => createCustomGrid(grid), [ grid ]);
	const [ currentGrid, setCurrentGrid ] = useState(customGrid);
	const [ actionsArray, setActionsArray ] = useState<SudokuAction[]>([]);

	const [ playMode, setPlayMode ] = useState(PlayMode.MACHINE);
	// User message
	const [ timeElapsed, setTimeElapsed ] = useState<number | null>(null);

	useEffect(
		() => {
			const customGrid = createCustomGrid(grid);
			setCurrentGrid(customGrid);
			const newActions = getSudokuActions(customGrid);
			setActionsArray(newActions);
			setTimeElapsed(null);
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
						setTimeElapsed(endTime - startTime);
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

	console.log("Is begin:", isBegin);

	return (
		<section className={classes["sudoku-section"]}>
			<SectionNav
				timeElapsed={timeElapsed}
				playMode={playMode}
				onChangeMode={(newMode: PlayMode) => setPlayMode(newMode)}
			/>
			<SudokuGrid grid={currentGrid} />
		</section>
	);
};

export default SudokuSection;
