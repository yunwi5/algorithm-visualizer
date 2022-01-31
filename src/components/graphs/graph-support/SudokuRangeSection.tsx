import { useRef } from "react";
import { DEFAULT_SPEED, sortingSpeedToRange } from "../../../utilities/calc-util";
import classes from "./RangeSection.module.scss";

interface Props {
	onChangeSpeed: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isBegin?: boolean;
}
const SudokuRangeSection: React.FC<Props> = (props) => {
	const { onChangeSpeed, isBegin } = props;

	const speedRef = useRef<HTMLInputElement>(null);

	return (
		<section className={`${classes["control-section"]}`}>
			<div className={classes.control}>
				<label htmlFor="sorting-speed">Speed</label>
				<input
					name="sorting-speed"
					id="sorting-speed"
					type="range"
					min="1"
					max="100"
					ref={speedRef}
					defaultValue={sortingSpeedToRange(DEFAULT_SPEED)}
					onChange={onChangeSpeed}
					disabled={isBegin}
				/>
				{speedRef.current && (
					<div className={classes.circle}>{speedRef.current!.value}</div>
				)}
			</div>
		</section>
	);
};

export default SudokuRangeSection;
