import { Fragment, useState, useLayoutEffect, useRef } from "react";
import {
	SortingAlgorithmList,
	SortingAlgorithm
} from "../../../models/sorting-models/sorting-models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import classes from "./SortingScroll.module.scss";

interface Props {
	numberOfSections: number;
	algorithm: SortingAlgorithm;
	onChangeAlgorithm: (algo: SortingAlgorithm) => void;
}

const SortingScroll: React.FC<Props> = (props) => {
	const { numberOfSections, algorithm, onChangeAlgorithm } = props;

	const [ scrollPos, setScrollPos ] = useState(0);
	const leftMoveRef = useRef<HTMLDivElement>(null);
	const rightMoveRef = useRef<HTMLDivElement>(null);

	const scrollPosHandler = (moveDirection: number) => {
		if (moveDirection === 1 && scrollPos > 0) return;
		if (moveDirection === -1 && scrollPos <= 0) return;
		setScrollPos((prev) => prev + moveDirection);
	};

	useLayoutEffect(
		() => {
			if (leftMoveRef.current) {
				if (scrollPos === 0) {
					leftMoveRef.current.style.opacity = ".2";
					leftMoveRef.current.style.cursor = "not-allowed";
				} else {
					leftMoveRef.current.style.opacity = "1";
					leftMoveRef.current.style.cursor = "pointer";
				}
			}
			if (rightMoveRef.current) {
				if (scrollPos === 1) {
					rightMoveRef.current.style.opacity = ".2";
					rightMoveRef.current.style.cursor = "not-allowed";
				} else {
					rightMoveRef.current.style.opacity = "1";
					rightMoveRef.current.style.cursor = "pointer";
				}
			}
		},
		[ scrollPos ]
	);

	const listStyle = {
		position: "absolute",
		left: `-${scrollPos * 100}%`
	};

	return (
		<div
			className={`${classes["sorting-scroll"]} ${numberOfSections > 1
				? classes["scroll-short"]
				: ""}`}
		>
			{numberOfSections === 1 && (
				<ul className={classes["long-ul"]}>
					{SortingAlgorithmList.map((algoName) => (
						<li
							key={algoName}
							className={`${algorithm === algoName ? classes["li-active"] : ""}`}
							onClick={onChangeAlgorithm.bind(null, algoName)}
						>
							{algoName}
						</li>
					))}
				</ul>
			)}
			{numberOfSections > 1 && (
				<Fragment>
					<div
						className={classes["icon-wrapper"]}
						onClick={scrollPosHandler.bind(null, -1)}
						ref={leftMoveRef}
					>
						<FontAwesomeIcon className={classes.icon} icon={faAngleLeft as IconProp} />
					</div>
					<div className={classes["list-wrapper"]}>
						<ul style={listStyle as any} className={classes["short-ul"]}>
							{SortingAlgorithmList.map((algoName) => (
								<li
									key={algoName}
									className={`${algorithm === algoName
										? classes["li-active"]
										: ""}`}
									onClick={onChangeAlgorithm.bind(null, algoName)}
								>
									{algoName}
								</li>
							))}
						</ul>
					</div>
					<div
						className={classes["icon-wrapper"]}
						onClick={scrollPosHandler.bind(null, 1)}
						ref={rightMoveRef}
					>
						<FontAwesomeIcon className={classes.icon} icon={faAngleRight as IconProp} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default SortingScroll;
