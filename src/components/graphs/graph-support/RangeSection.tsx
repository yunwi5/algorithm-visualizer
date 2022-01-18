import { useRef, useEffect } from "react";
import { DEFAULT_ARR_SIZE, DEFAULT_SPEED, sortingSpeedToRange } from "../../../utilities/calc-util";
import classes from "./RangeSection.module.scss";

interface Props {
	onChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSpeed: (e: React.ChangeEvent<HTMLInputElement>) => void;
	colorSecondary?: boolean;
	isBegin?: boolean;
}
const RangeSection: React.FC<Props> = (props) => {
	const { onChangeSize, onChangeSpeed, colorSecondary, isBegin } = props;

	const speedRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			if (isBegin && speedRef.current && sizeRef.current) {
				speedRef.current.disabled = true;
				sizeRef.current.disabled = true;
			} else if (speedRef.current && sizeRef.current) {
				speedRef.current.disabled = false;
				sizeRef.current.disabled = false;
			}
		},
		[ isBegin ]
	);

	return (
		<section
			className={`${classes["control-section"]} ${colorSecondary ? classes.secondary : ""}`}
		>
			<div className={classes.control}>
				<label htmlFor="array-size">Array Size</label>
				<input
					name="array-size"
					id="array-size"
					type="range"
					min="5"
					max="300"
					ref={sizeRef}
					defaultValue={DEFAULT_ARR_SIZE}
					onChange={onChangeSize}
				/>
				{sizeRef.current && <div className={classes.circle}>{sizeRef.current!.value}</div>}
			</div>
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
				/>
				{speedRef.current && (
					<div className={classes.circle}>{speedRef.current!.value}</div>
				)}
			</div>
		</section>
	);
};

export default RangeSection;
