import { Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/layout/Header";

const HomePage: React.FC = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Algo Visualizer</title>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="Algorithm Visualizer for sorting, searching, path finding and more."
				/>
			</Helmet>
			<Header />
			<h1>Hi Home Page</h1>
		</Fragment>
	);
};

export default HomePage;
