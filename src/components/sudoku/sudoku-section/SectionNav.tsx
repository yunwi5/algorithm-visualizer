import { getTimeElapsedInFormat } from "../../../utilities/calc-util";
import classes from "./SectionNav.module.scss";

interface Props {
	timeElapsed: number | null;
}

const SectionNav: React.FC<Props> = (props) => {
	const { timeElapsed } = props;

	return (
		<div className={classes["section-nav"]}>
			<button className={`${classes.btn}`}>Use Solver</button>
			<button className={`${classes.btn}`}>Try Yourself</button>

			{timeElapsed && (
				<p className={classes.message}>{getTimeElapsedInFormat(timeElapsed)}s Taken</p>
			)}
		</div>
	);
};

export default SectionNav;
