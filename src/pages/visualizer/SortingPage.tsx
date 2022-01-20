import { Fragment, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import SortingVisualizer from "../../components/sorting-visualizer/SortingVisualizer";
import SortingIntro from "../../components/sorting-visualizer/sorting-info/SortingIntro";
import ModalContext from "../../store/modal-context";
import Modal from "../../components/ui/IntroModal";

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
				<Modal onClose={() => showSortingModal(false)}>
					<SortingIntro />
				</Modal>
			)}
		</Fragment>
	);
};

export default SortingPage;
