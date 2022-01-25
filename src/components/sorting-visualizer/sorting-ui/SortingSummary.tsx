import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import classes from "./SortingSummary.module.scss";

interface Props {
	arraySize: number;
	comparisons: number;
	swaps: number;
	timeElapsed: number | null;
}

const SortingSummary: React.FC<Props> = (props) => {
	const { arraySize, comparisons, swaps, timeElapsed } = props;

	return (
		<div className={classes["sorting-summary"]}>
			<p>
				<span className={classes.label}>Array Size: </span>
				<span className={classes.value}>{arraySize}</span>
			</p>
			<p>
				<span className={classes.label}>Comparisons: </span>
				<span className={classes.value}>{comparisons}</span>
			</p>
			<p>
				<span className={classes.label}>Swaps: </span>
				<span className={classes.value}>{swaps}</span>
			</p>
			{timeElapsed && (
				<p className={classes.time}>
					{getTimeElapsedInFormat(timeElapsed)}s <span>Taken</span>
				</p>
			)}
		</div>
	);
};

export default SortingSummary;
