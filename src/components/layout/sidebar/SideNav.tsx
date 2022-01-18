import { NavLink } from "react-router-dom";
import classes from "./SideNav.module.scss";

/* Side Navigation */
const SideNav: React.FC = () => {
	return (
		<aside className={classes.sidenav}>
			<h2>AlgoVisualizer</h2>
			<ul>
				<li>
					<NavLink to="/sorting">Path Finding</NavLink>
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
					<NavLink
						className={(navData) => (navData.isActive ? classes.active : "")}
						to="/sorting"
					>
						Sorting
					</NavLink>
				</li>
			</ul>
		</aside>
	);
};

export default SideNav;
