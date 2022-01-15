import { Fragment } from "react";
import SortingVisualizer from "../../components/sorting-visualizer/SortingVisualizer";
import SortingIntro from "../../components/sorting-visualizer/sorting-heading/SortingIntro";

const SortingPage: React.FC = () => {
	return (
		<Fragment>
			<SortingIntro />
			<SortingVisualizer />
		</Fragment>
	);
};

export default SortingPage;
