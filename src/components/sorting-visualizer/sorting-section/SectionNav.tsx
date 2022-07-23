import SortingScroll from '../sorting-ui/SortingScroll';
import { SortingAlgorithm } from '../../../models/sorting-models/sorting-models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark as exitIcon } from '@fortawesome/pro-regular-svg-icons';
import classes from './SectionNav.module.scss';

interface Props {
    isBegin: boolean;
    algorithm: SortingAlgorithm;
    numberOfSections: number;
    onChangeAlgorithm: (algo: SortingAlgorithm) => void;
    onRandomize: () => void;
    onClose: () => void;
}

const SectionNav: React.FC<Props> = (props) => {
    const { isBegin, algorithm, numberOfSections, onChangeAlgorithm, onRandomize, onClose } =
        props;

    const navSizeClass =
        numberOfSections >= 3
            ? classes['nav-quarter']
            : numberOfSections === 2
            ? classes['nav-half']
            : '';

    return (
        <nav className={`${classes['section-nav']} ${navSizeClass}`}>
            <div className={classes['algorithm-selector']}>
                <label>Algorithm</label>
                <SortingScroll
                    numberOfSections={numberOfSections}
                    algorithm={algorithm}
                    onChangeAlgorithm={onChangeAlgorithm}
                />
            </div>
            <div className={classes['btns-wrapper']}>
                {!isBegin && (
                    <button className={classes['random-btn']} onClick={onRandomize}>
                        Randomize
                    </button>
                )}
                {!isBegin && numberOfSections > 1 && (
                    <button className={classes['close-btn']} onClick={onClose}>
                        <FontAwesomeIcon icon={exitIcon as IconProp} />
                    </button>
                )}
            </div>
        </nav>
    );
};

export default SectionNav;
