import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import SearchVisualizer from "../../components/search-visualizer/SearchVisualizer";
import SearchIntroList from "../../components/search-visualizer/search-info/SearchIntro";
import ModalContext from "../../store/modal-context";
import IntroModal, { Theme } from "../../components/ui/IntroModal";

const SearchingPage: React.FC = () => {
	const { searchModalVisible, showSearchModal } = useContext(ModalContext);

	return (
		<Fragment>
			<Helmet>
				<title>Search Visualizer</title>
				<meta
					name="description"
					content="Search algorithms visualizing page. This page visualizes binary search and linear search, and allow users to compare the run time of these two popular search algorithms"
				/>
			</Helmet>
			<SearchVisualizer />
			{searchModalVisible && (
				<IntroModal
					introJsxList={SearchIntroList}
					theme={Theme.Secondary}
					onClose={showSearchModal.bind(null, false)}
				/>
			)}
		</Fragment>
	);
};

export default SearchingPage;
