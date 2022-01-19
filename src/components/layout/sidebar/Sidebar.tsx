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

	const toggleSidebarHandler = () => {
		setShowNav((prev) => !prev);
	};

	return (
		<Fragment>
			<div className={classes["icon-wrapper"]} onClick={toggleSidebarHandler}>
				<FontAwesomeIcon className={classes.icon} icon={faBars} />
			</div>
			{showNav && (
				<Fragment>
					{ReactDOM.createPortal(<Backdrop onClose={toggleSidebarHandler} />, sidebarDiv)}
					{ReactDOM.createPortal(<SideNav onClose={toggleSidebarHandler} />, sidebarDiv)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Sidebar;
