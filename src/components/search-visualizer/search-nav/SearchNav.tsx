import { useContext } from "react";
import RangeSection from "../../graphs/graph-support/RangeSection";
import ToggleBar from "../../ui/ToggleBar";

import Sidebar from "../../layout/sidebar/Sidebar";
import { Theme } from "../../../models/gen-model";
import ModalContext from "../../../store/modal-context";
import { toMsSpeed } from "../../../utilities/calc-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import classes from "./SearchNav.module.scss";

interface Props {
	onChangeSpeed: (speed: number) => void;
	onChangeSize: (size: number) => void;
	onChangeDuo: () => void;
	onRandomize: () => void;
	isBegin: boolean;
}

const SearchNav: React.FC<Props> = (props) => {
	const { onChangeSpeed, onChangeSize, onChangeDuo, onRandomize, isBegin } = props;

	const { showSearchModal } = useContext(ModalContext);

	function speedChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const speed = toMsSpeed(+e.target.value);
		onChangeSpeed(speed);
	}

	function sizeChangeHandler (e: React.ChangeEvent<HTMLInputElement>) {
		const newSize = parseInt(e.target.value);
		onChangeSize(newSize);
	}

	function displayDuoHandler (e: React.ChangeEvent<HTMLInputElement>) {
		onChangeDuo();
	}

	return (
		<nav className={classes.nav}>
			<div className={classes.heading}>
				<Sidebar />
				<h2>Search Visualizer</h2>
			</div>
			<div className={classes.controls}>
				<RangeSection
					onChangeSpeed={speedChangeHandler}
					onChangeSize={sizeChangeHandler}
					colorSecondary={true}
					isBegin={isBegin}
				/>
				<ToggleBar onChange={displayDuoHandler} isBegin={isBegin} theme={Theme.SECONDARY} />
			</div>
			<div className={classes.action}>
				<button disabled={isBegin ? true : false} onClick={onRandomize}>
					Randomize
				</button>
				{!isBegin && (
					<FontAwesomeIcon
						onClick={showSearchModal.bind(null, true)}
						className={classes["info-icon"]}
						icon={faCircleInfo as IconProp}
					/>
				)}
			</div>
		</nav>
	);
};

export default SearchNav;
