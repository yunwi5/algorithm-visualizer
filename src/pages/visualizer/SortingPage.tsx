import { Fragment } from "react";
import SortingVisualizer from "../../components/sorting-visualizer/SortingVisualizer";
import SortingIntro from "../../components/sorting-visualizer/sorting-info/SortingIntro";

const SortingPage: React.FC = () => {
	return (
		<Fragment>
			<SortingVisualizer />
			<SortingIntro />
		</Fragment>
	);
};

export default SortingPage;
