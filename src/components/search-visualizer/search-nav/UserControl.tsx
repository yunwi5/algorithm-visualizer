import { useRef, useState, useEffect } from "react";
import classes from "./UserControl.module.scss";

interface Props {
	onChangeTarget: (target: number) => void;
	onChangeMin: (newMin: number) => void;
	onChangeMax: (newMax: number) => void;
	onBegin: () => void;
}

const UserControl: React.FC<Props> = (props) => {
	const { onChangeTarget, onChangeMax, onChangeMin, onBegin } = props;

	const targetRef = useRef<HTMLInputElement>(null);

	const [ targetErrMessage, setTargetErrMessage ] = useState<string | null>(null);
	const [ minErrMessage, setMinErrMessage ] = useState<string | null>(null);
	const [ maxErrMessage, setMaxErrMessage ] = useState<string | null>(null);
	const [ overallErrMessage, setOverallErrMessage ] = useState<string | null>(null);

	function targetChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		if (isNaN(value) || value <= 0) {
			setTargetErrMessage("Please enter a valid target > 0");
			return;
		}
		setTargetErrMessage(null);
		onChangeTarget(value);
	}

	function minChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const value = +e.target.value;
		if (isNaN(value) || value <= 0) {
			setMinErrMessage("Please enter a valid min > 0");
			return;
		}

		setMinErrMessage(null);
		onChangeMin(value);
	}

	function maxChnageHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const value = +e.target.value;
		if (isNaN(value) || value <= 0) {
			setMaxErrMessage("Please enter a valid max > 0");
			return;
		}

		setMaxErrMessage(null);
		onChangeMax(value);
	}

	function startHandler () {
		const targetValue = targetRef.current!.value;
		if (!targetValue) {
			setOverallErrMessage("Please enter your target");
			return;
		}
		if (targetErrMessage || minErrMessage || maxErrMessage) return;
		setOverallErrMessage(null);
		onBegin();
	}

	useEffect(
		() => {
			if (targetErrMessage || minErrMessage || maxErrMessage) {
				setOverallErrMessage("Please enter valid numbers first!");
				return;
			}
			setOverallErrMessage(null);
		},
		[ targetErrMessage, minErrMessage, maxErrMessage ]
	);

	return (
		<div>
			<div className={classes.controls}>
				<div className={classes["control-wrapper"]}>
					<div className={`${classes.control} ${classes["control-long"]}`}>
						<label>Target</label>
						<input
							type="number"
							id="target"
							placeholder="Number you want"
							ref={targetRef}
							onChange={targetChangeHandler}
							required
						/>
					</div>
					{targetErrMessage && <p>{targetErrMessage}</p>}
				</div>
				<div className={classes["control-wrapper"]}>
					<div className={`${classes.control} ${classes["control-short"]}`}>
						<label>Min</label>
						<input
							type="number"
							placeholder="(>0)"
							onChange={minChangeHandler}
							defaultValue={1}
							required
						/>
					</div>
					{minErrMessage && <p>{minErrMessage}</p>}
				</div>
				<div className={classes["control-wrapper"]}>
					<div className={`${classes.control} ${classes["control-short"]}`}>
						<label>Max</label>
						<input
							type="number"
							placeholder="(>0)"
							onChange={maxChnageHandler}
							defaultValue={100}
							required
						/>
					</div>
					{maxErrMessage && <p>{maxErrMessage}</p>}
				</div>
				<div className={classes.action}>
					<button onClick={startHandler}>Visualize</button>
					{overallErrMessage && <p>{overallErrMessage}</p>}
				</div>
			</div>
		</div>
	);
};

export default UserControl;
