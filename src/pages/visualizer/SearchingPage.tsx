import { Fragment, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import SearchVisualizer from "../../components/search-visualizer/SearchVisualizer";
import SearchIntro from "../../components/search-visualizer/search-info/SearchIntro";
import ModalContext from "../../store/modal-context";
import Modal from "../../components/ui/IntroModal";

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
				<Modal onClose={showSearchModal.bind(null, false)}>
					<SearchIntro />
				</Modal>
			)}
		</Fragment>
	);
};

export default SearchingPage;
