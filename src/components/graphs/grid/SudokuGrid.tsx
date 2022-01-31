import { SudokuCell } from "../../../models/sudoku-model";
import GridCell from "./GridCell";
import classes from "./SudokuGrid.module.scss";

interface Props {
	grid: SudokuCell[][];
}

const SudokuGrid: React.FC<Props> = ({ grid }) => {
	return (
		<table className={classes["sudoku-grid"]}>
			<tbody>
				{grid.map((row, idx) => (
					<tr className={classes.row} key={idx}>
						{row.map((cell, i) => <GridCell key={i} cell={cell} />)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SudokuGrid;
