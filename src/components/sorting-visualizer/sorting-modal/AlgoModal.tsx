import { SortingAlgorithm, AlgorithmInfo } from "../../../models/sorting-models";
import Modal from "../../ui/Modal";
import { makePowerForm } from "../../../utilities/string-util";
import classes from "./AlgoModal.module.scss";

interface Props {
	algorithm: SortingAlgorithm;
	onClose: () => void;
}

const sortingAlgorithmsInfoList: AlgorithmInfo[] = [
	{
		name: SortingAlgorithm.QuickSort,
		about:
			"QuickSort, like the name suggests, is one of the fatest sorting algorithm that is commonly used in practice.",
		timeComplexity: {
			bestCase: "n log(n)",
			averageCase: "n long(n)",
			worstCase: "n^2"
		},
		spaceComplexity: "log(n)"
	},
	{
		name: SortingAlgorithm.MergeSort,
		about:
			"MergeSort, popular Divide-And-Conquer algorithm that splits the array into smaller and smaller subarrays, and then merge them afterwards. This algorithm always have optimal time complexity in any input cases.",
		timeComplexity: {
			bestCase: "n log(n)",
			averageCase: "n long(n)",
			worstCase: "n long(n)"
		},
		spaceComplexity: "n"
	},
	{
		name: SortingAlgorithm.SelectionSort,
		about:
			"SelectionSort is not an ideal sorting algorithm due to its consistently bad time complexity. However, it is a relatively simple algorithm to implement, and easy to understand.",
		timeComplexity: {
			bestCase: "n^2",
			averageCase: "n^2",
			worstCase: "n^2"
		},
		spaceComplexity: "1"
	}
];

function getAlgorithmInfo (algorithm: SortingAlgorithm) {
	return (
		sortingAlgorithmsInfoList.find((algoObj) => algoObj.name === algorithm) ||
		sortingAlgorithmsInfoList[0]
	);
}

const AlgorithmModal: React.FC<Props> = (props) => {
	const { algorithm, onClose } = props;

	const { name, about, timeComplexity, spaceComplexity } = getAlgorithmInfo(algorithm);

	return (
		<Modal onClose={onClose}>
			<section className={classes["algo-modal"]}>
				<h2>{name} Algorithm</h2>
				<div className={classes.part}>
					<h4>About</h4>
					<p>{about}</p>
				</div>
				<div className={classes.part}>
					<h4>Time Complexity</h4>
					<div>
						<span>Best Case:</span>{" "}
						<strong>O({makePowerForm(timeComplexity.bestCase)})</strong>
					</div>
					<div>
						<span>Average Case:</span>{" "}
						<strong>O({makePowerForm(timeComplexity.averageCase)})</strong>
					</div>
					<div>
						<span>Worst Case:</span>{" "}
						<strong>O({makePowerForm(timeComplexity.worstCase)})</strong>
					</div>
				</div>
				<div className={classes.part}>
					<h4>Space Complexity</h4>
					<div>
						<span>All Cases:</span> <strong>
							O({makePowerForm(spaceComplexity)})
						</strong>{" "}
					</div>
				</div>
				<div className={classes["btn-wrapper"]}>
					<button onClick={onClose}>Close</button>
				</div>
			</section>
		</Modal>
	);
};

export default AlgorithmModal;
