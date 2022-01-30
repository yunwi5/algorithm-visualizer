import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import SortingVisualizer from "../../components/sorting-visualizer/SortingVisualizer";
import SortingIntroList from "../../components/sorting-visualizer/sorting-info/SortingIntro";
import ModalContext from "../../store/modal-context";
import IntroModal, { Theme } from "../../components/ui/IntroModal";

const SortingPage: React.FC = () => {
	const { sortingModalVisible, showSortingModal } = useContext(ModalContext);

	return (
		<Fragment>
			<Helmet>
				<title>Sorting Visualizer</title>
				<meta
					name="description"
					content="Sorting page that animates 5 different sorting algorithms, and allows users to compare the run times of the popular sorting algorithms."
				/>
			</Helmet>
			<SortingVisualizer />
			{sortingModalVisible && (
				<IntroModal
					introJsxList={SortingIntroList}
					theme={Theme.Primary}
					onClose={() => showSortingModal(false)}
				/>
			)}
		</Fragment>
	);
};

export default SortingPage;
