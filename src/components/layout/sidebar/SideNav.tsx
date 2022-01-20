import { NavLink } from "react-router-dom";
import classes from "./SideNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowLeft } from "@fortawesome/pro-light-svg-icons";

interface Prop {
	onClose: () => void;
}

/* Side Navigation */
const SideNav: React.FC<Prop> = (props) => {
	const { onClose } = props;

	return (
		<aside className={classes.sidenav}>
			<FontAwesomeIcon
				onClick={onClose}
				className={classes.icon}
				icon={faLongArrowLeft as IconProp}
			/>
			<h2>
				<span>Algo</span> <br /> <span>Visualizer</span>
			</h2>
			<ul>
				<li>
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/"
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/sorting"
					>
						Sorting
					</NavLink>
				</li>
				<li>
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/searching"
					>
						Searching
					</NavLink>
				</li>

				<li>
					<NavLink to="/sorting">Path Finding</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default SideNav;
