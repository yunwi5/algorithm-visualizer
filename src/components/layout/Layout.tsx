import Header from "./Header";
import Footer from "./Footer";
import classes from "./Layout.module.scss";

const Layout: React.FC = (props) => {
	return (
		<div className={classes.layout}>
			{props.children}
			<Footer />
		</div>
	);
};

export default Layout;
