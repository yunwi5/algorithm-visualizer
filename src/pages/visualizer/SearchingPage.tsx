import { Fragment } from "react";
import SearchVisualizer from "../../components/search-visualizer/SearchVisualizer";
import SearchIntro from "../../components/search-visualizer/search-info/SearchIntro";

const SearchingPage: React.FC = () => {
	return (
		<Fragment>
			<SearchVisualizer />
			<SearchIntro />
		</Fragment>
	);
};

export default SearchingPage;
