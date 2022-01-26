import { useState } from 'react';
import { SortingAlgorithmList, SortingAlgorithm } from "../../../models/sorting-models/sorting-models";
import AlgoModal from "../sorting-modal/AlgoModal";
import classes from "./SortingInfoButtons.module.scss";

interface Props {
	numSections: number;
}

const SortingInfoButtons: React.FC<Props> = (props) => {
	const { numSections } = props;
	const [algorithm, setAlgorithm] = useState<SortingAlgorithm | null>(null);
	const [showModal, setShowModal] = useState(false);

	const modalDisplayHandler = (algorithm: SortingAlgorithm) => {
		setAlgorithm(algorithm);
		setShowModal(true);
	}


	const wrapperClass =
		numSections >= 3
			? classes["wrapper-quarter"]
			: numSections === 2 ? classes["wrapper-half"] : "";

	return (
		<>
			{algorithm && showModal && <AlgoModal onClose={() => setShowModal(false)} algorithm={algorithm} /> }
			<div className={`${classes["btn-wrapper"]} ${wrapperClass}`}>
				{SortingAlgorithmList.map((algoName) => (
					<button className={classes.btn} key={algoName} onClick={modalDisplayHandler.bind(null, algoName)}>
						{algoName}
					</button>
				))}
			</div>
		</>
	);
};

export default SortingInfoButtons;
