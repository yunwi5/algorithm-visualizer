import { CellState, SudokuCell, PlayMode } from "../../../models/sudoku-model";
import classes from "./GridCell.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faExclamationCircle, faLightbulbOn } from "@fortawesome/pro-duotone-svg-icons";

interface Props {
	cell: SudokuCell;
	playMode: PlayMode;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GridCell: React.FC<Props> = ({ cell, playMode, onChange }) => {
	const { value, status, errMessages } = cell;

	const isUserMode = playMode === PlayMode.USER ? true : false;
	const isFixedCell = status === CellState.FIXED ? true : false;
	// If the mode is UserMode, and the cell is not a fixed cell, show input for the uesr
	const showAsInput = isUserMode && !isFixedCell;

	if (errMessages) console.log(errMessages);

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
			{errMessages &&
			errMessages.length > 0 && (
				<div className={classes.message}>
					<FontAwesomeIcon className={classes.message__icon} icon={faExclamationCircle} />
					<div className={classes.message__content}>
						<span className={classes.message__heading}>
							<FontAwesomeIcon className={classes.icon} icon={faLightbulbOn} />
							Tips
						</span>
						<ul>
							{errMessages.map((mes, idx) => (
								<li key={idx} className={classes.message__text}>
									{mes}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</td>
	);
};

export default GridCell;
