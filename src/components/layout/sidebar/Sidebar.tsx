import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-light-svg-icons";
import SideNav from "./SideNav";
import Backdrop from "../../ui/Backdrop";
import classes from "./Sidebar.module.scss";

/* Sidebar with backdrop */
const sidebarDiv = document.getElementById("sidebar") as HTMLElement;

const Sidebar: React.FC = (props) => {
	const [ showNav, setShowNav ] = useState(false);

	return (
		<Fragment>
			<div className={classes["icon-wrapper"]} onClick={() => setShowNav((prev) => !prev)}>
				<FontAwesomeIcon className={classes.icon} icon={faBars} />
			</div>
			{showNav && (
				<Fragment>
					{ReactDOM.createPortal(
						<Backdrop onClose={() => setShowNav(false)} />,
						sidebarDiv
					)}
					{ReactDOM.createPortal(<SideNav />, sidebarDiv)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Sidebar;
