import React from "react";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
	return (
		<header className={classes.header}>
			<h2>AlgoVisualizer</h2>
			<ul>
				<li>Network Flow</li>
				<li>Path Finding</li>
				<li>Sorting</li>
			</ul>
		</header>
	);
};

export default Header;
