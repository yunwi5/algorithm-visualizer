import { SortingAlgorithm } from '../../../models/sorting-models/sorting-models';
import Modal from '../../ui/Modal';
import { getAlgorithmInfo } from '../../../models/sorting-models/sorting-info-model';
import { makePowerForm } from '../../../utilities/string-util';
import classes from './AlgoModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

interface Props {
    algorithm: SortingAlgorithm;
    onClose: () => void;
}

const AlgorithmModal: React.FC<Props> = (props) => {
    const { algorithm, onClose } = props;

    const { name, about, timeComplexity, spaceComplexity } = getAlgorithmInfo(algorithm);

    return (
        <Modal onClose={onClose}>
            <section className={classes['algo-modal']}>
                <h2>
                    {name} Algorithm
                    <div className={classes.exit} onClick={onClose}>
                        <FontAwesomeIcon
                            className={classes['exit-icon']}
                            icon={faXmark as any}
                        />
                    </div>
                </h2>
                <div className={classes.part}>
                    <h4>About</h4>
                    <p>{about}</p>
                </div>
                <div className={classes.part}>
                    <h4>Time Complexity</h4>
                    <div>
                        <span>Best Case:</span>{' '}
                        <strong>O({makePowerForm(timeComplexity.bestCase)})</strong>
                    </div>
                    <div>
                        <span>Average Case:</span>{' '}
                        <strong>O({makePowerForm(timeComplexity.averageCase)})</strong>
                    </div>
                    <div>
                        <span>Worst Case:</span>{' '}
                        <strong>O({makePowerForm(timeComplexity.worstCase)})</strong>
                    </div>
                </div>
                <div className={classes.part}>
                    <h4>Space Complexity</h4>
                    <div>
                        <span>All Cases:</span>{' '}
                        <strong>O({makePowerForm(spaceComplexity)})</strong>{' '}
                    </div>
                </div>
                <div className={classes['btn-wrapper']}>
                    <button onClick={onClose}>Close</button>
                </div>
            </section>
        </Modal>
    );
};

export default AlgorithmModal;
