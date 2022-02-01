import { SudokuCell } from "../../../models/sudoku-model";
import GridCell from "./GridCell";
import { PlayMode } from "../../../models/sudoku-model";
import classes from "./SudokuGrid.module.scss";

interface Props {
	grid: SudokuCell[][];
	playMode: PlayMode;
	onChangeCell?: (row: number, col: number, newValue: number) => void;
}

const SudokuGrid: React.FC<Props> = ({ grid, playMode, onChangeCell }) => {
	// UserPlay Mode
	const cellChangeHandler = (row: number, col: number, newValueString: string) => {
		// If the input is empty string, parse it to 0
		const newValueInt = newValueString ? parseInt(newValueString) : 0;
		if (isNaN(newValueInt)) return;
		if (onChangeCell) onChangeCell(row, col, newValueInt);
	};

	return (
		<table className={classes["sudoku-grid"]}>
			<tbody>
				{grid.map((row, rowIdx) => (
					<tr className={classes.row} key={rowIdx}>
						{row.map((cell, colIdx) => (
							<GridCell
								key={colIdx}
								cell={cell}
								playMode={playMode}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									cellChangeHandler(rowIdx, colIdx, e.target.value);
								}}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SudokuGrid;
