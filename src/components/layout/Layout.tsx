import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = (props) => {
	return (
		<div>
			<Header />
			{props.children}
			<Footer />
		</div>
	);
};

export default Layout;
