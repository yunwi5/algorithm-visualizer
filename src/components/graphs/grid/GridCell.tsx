import { SudokuCell } from "../../../models/sudoku-model";
import classes from "./GridCell.module.scss";

interface Props {
	cell: SudokuCell;
}

const GridCell: React.FC<Props> = ({ cell }) => {
	const { value, status } = cell;

	return (
		<td className={`${classes["cell"]} ${classes["cell-" + status]}`}>{value ? value : ""}</td>
	);
};

export default GridCell;
