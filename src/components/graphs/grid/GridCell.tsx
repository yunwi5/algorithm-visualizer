import { CellState, SudokuCell, PlayMode } from "../../../models/sudoku-model";
import classes from "./GridCell.module.scss";

interface Props {
	cell: SudokuCell;
	playMode: PlayMode;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GridCell: React.FC<Props> = ({ cell, playMode, onChange }) => {
	const { value, status } = cell;

	const isUserMode = playMode === PlayMode.USER ? true : false;
	const isFixedCell = status === CellState.FIXED ? true : false;
	// If the mode is UserMode, and the cell is not a fixed cell, show input for the uesr
	const showAsInput = isUserMode && !isFixedCell;

	return (
		<td className={`${classes["cell"]} ${classes["cell-" + status]}`}>
			{!showAsInput && <span>{value ? value : ""}</span>}
			{showAsInput && (
				<input
					type="text"
					value={value ? value : ""}
					className={classes.input}
					onChange={onChange}
				/>
			)}
		</td>
	);
};

export default GridCell;
