import React, { Fragment, useState, useEffect } from "react";
import classes from "./SortingNav.module.scss";
import {
	DEFAULT_ARR_SIZE,
	DEFAULT_SORTING_SPEED,
	MIN_SPEED,
	MAX_SPEED
} from "../SortingVisualizer";

interface Props {
	isBegin: boolean;
	onChangeArraySize: (size: number) => void;
	onChangeSortingSpeed: (speed: number) => void;
	onChangeStart: (isBegin: boolean) => void;
	onAddSection: () => void;
	numberOfSections: number;
}

// Translate range value to sorting speed in ms.
function toSortingSpeed (value: number) {
	// x1 should be 500ms per operation
	// x100 should be 5ms per operation
	const reverse = 1 / value;
	const speed = reverse * ((MIN_SPEED + MAX_SPEED) / 2);
	return speed;
}

// Exact Reverse of toSortingSpeed Fn.
function sortingSpeedToRange (sortingSpeed: number) {
	return 1 / (sortingSpeed / MIN_SPEED);
}

const SortingNav: React.FC<Props> = (props) => {
	const {
		isBegin,
		onChangeArraySize,
		onChangeSortingSpeed,
		onChangeStart,
		onAddSection,
		numberOfSections
	} = props;

	const [ userErrMessage, setUserErrMessage ] = useState<string | null>(null);

	// size between 5 and 100!
	function arrSizeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		onChangeArraySize(value);
	}

	// Sorting speed in ms!
	// sorting range between x1 and x100!
	function sortSpeedHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		onChangeSortingSpeed(toSortingSpeed(value));
	}

	// Maximum 4 sections at a time!
	function addSectionHandler () {
		if (numberOfSections <= 3) {
			onAddSection();
		} else {
			setUserErrMessage("Maximum 4 sections!");
		}
	}

	useEffect(
		() => {
			let timer = setTimeout(() => {
				setUserErrMessage(null);
			}, 1000);
			return () => clearTimeout(timer);
		},
		[ userErrMessage ]
	);

	return (
		<nav className={classes["sorting-nav"]}>
			<h3>Sorting Visualizer</h3>
			<section className={classes["control-section"]}>
				<div className={classes.control}>
					<label htmlFor="array-size">Array Size</label>
					<input
						name="array-size"
						id="array-size"
						type="range"
						min="5"
						max="300"
						defaultValue={DEFAULT_ARR_SIZE}
						onChange={arrSizeHandler}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="sorting-speed">Sorting Speed</label>
					<input
						name="sorting-speed"
						id="sorting-speed"
						type="range"
						min="1"
						max="100"
						defaultValue={sortingSpeedToRange(DEFAULT_SORTING_SPEED)}
						onChange={sortSpeedHandler}
					/>
				</div>
			</section>

			<div className={classes.buttons}>
				{!isBegin && (
					<Fragment>
						{!userErrMessage && (
							<button className={classes["btn-empty"]} onClick={addSectionHandler}>
								Add New +
							</button>
						)}
						{userErrMessage && (
							<p className={classes["err-message"]}>{userErrMessage}</p>
						)}
					</Fragment>
				)}
				{!isBegin && (
					<button
						className={classes["btn-fill"]}
						onClick={onChangeStart.bind(null, true)}
					>
						Start!
					</button>
				)}
			</div>
			{isBegin && <p className={classes.message}>On Going ...</p>}
		</nav>
	);
};

export default SortingNav;
