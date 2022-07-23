import classes from './SortingIntro.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faQuoteLeft } from '@fortawesome/pro-solid-svg-icons';
import { faAngleRight, faList } from '@fortawesome/pro-duotone-svg-icons';
import SortingBarImage from '../../../assets/sorting-image/SortingBars.jpg';
import SortingComparisonImage from '../../../assets/sorting-image/SortingComparison.jpg';
import SortingNavImg from '../../../assets/sorting-image/SortingNavControl.jpg';
import SortingSectionImg from '../../../assets/sorting-image/SortingSection.jpg';

const SortingIntro: React.FC = () => {
    return (
        <div className={classes['sorting-intro']}>
            <h2>Visualize Popular Sorting Algorithms</h2>
            <div className={classes['text-container']}>
                <p>
                    <span>
                        If you want to explore sorting algorithms, try the visualizer on your
                        own! Have a look at how we animated the most popular sorting algorithms
                        existing in the world.
                    </span>
                </p>
                <img src={SortingBarImage} className={classes.img} alt="sorting bar" />
            </div>
        </div>
    );
};

const SortingFunctionality: React.FC = () => {
    return (
        <div className={`${classes['sorting-intro']} ${classes['sorting-functionality']}`}>
            <h2>Support Functionalities</h2>
            <div className={classes['func-section']}>
                <p>Controlling array size and speed</p>
                <img
                    className={`${classes.img} ${classes['img-small']}`}
                    src={SortingNavImg}
                    alt="Img explaining control arrray size and speed"
                />
            </div>
            <div className={classes['func-section']}>
                <p>Select an algorithm and randomize</p>
                <img
                    className={classes.img}
                    src={SortingSectionImg}
                    alt="Img explaining algorithm selection and randomize"
                />
            </div>
        </div>
    );
};

const AlgorithmsIntro: React.FC = () => {
    return (
        <div className={`${classes['sorting-intro']} ${classes['sorting-intro-algorithms']}`}>
            <h2>Algorithms Available</h2>
            <span className={classes['list-label']}>
                <FontAwesomeIcon className={classes.icon} icon={faList} />
                List
            </span>
            <ul className={classes['algorithms-list']}>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>BubbleSort</strong>:{' '}
                    <span className={classes.brief}>
                        In place and stable. Inefficient in all cases.
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>SelectionSort</strong>:{' '}
                    <span className={classes.brief}>
                        In place and <strong>NOT</strong> stable. Inefficient in all cases.
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>InsertionSort</strong>:{' '}
                    <span className={classes.brief}>
                        In place and stable. Highly efficient in the best case (only).
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>MergeSort</strong>:{' '}
                    <span className={classes.brief}>
                        <strong>NOT</strong> In place and stable. Time efficient in all cases.
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>QuickSort</strong>:{' '}
                    <span className={classes.brief}>
                        In place and <strong>NOT</strong> stable. Generally efficient, and
                        commonly used.
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon
                        className={classes.icon}
                        icon={faAngleRight as IconProp}
                    />
                    <strong className={classes['algo-name']}>HeapSort</strong>:{' '}
                    <span className={classes.brief}>
                        In place and <strong>NOT</strong> stable. Time efficient in all cases.
                    </span>
                </li>
            </ul>
            <div className={classes['definition-box']}>
                <p>
                    <FontAwesomeIcon className={classes.icon} icon={faQuoteLeft as IconProp} />
                    <strong>In place</strong>{' '}
                    <span>means the sorting requires no extra storage space</span>
                </p>
                <p>
                    <FontAwesomeIcon className={classes.icon} icon={faQuoteLeft as IconProp} />
                    <strong>Stable</strong>{' '}
                    <span>
                        means maintaining the relative order of records with equal keys
                    </span>
                </p>
            </div>
        </div>
    );
};

const ColorFirstHalf: React.FC = () => {
    return (
        <div className={classes['sorting-intro']}>
            <h2>Bar States</h2>
            <div className={classes['list-container']}>
                <ul className={classes['color-list']}>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.initial}`} />{' '}
                        <span>Initial State</span>{' '}
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.pending}`} />{' '}
                        <span>Comparison State</span>{' '}
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.swapped}`} />{' '}
                        <span>Swap State</span>{' '}
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.selected}`} />{' '}
                        <span>Selected State</span>{' '}
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.pivot}`} />{' '}
                        <span>Pivot State</span>{' '}
                        <span className={classes.suffix}>(QuickSort)</span>
                    </li>
                </ul>
                <ul className={classes['color-list']}>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes['left-pointer']}`} />{' '}
                        <span>Left Pointer</span>{' '}
                        <span className={classes.suffix}>(QuickSort)</span>
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes['right-pointer']}`} />{' '}
                        <span>Right Pointer </span>{' '}
                        <span className={classes.suffix}>(QuickSort)</span>
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.sorted}`} />{' '}
                        <span>Sorted State</span>{' '}
                    </li>
                    <li className={classes['color-item']}>
                        <div className={`${classes.color} ${classes.final}`} />{' '}
                        <span>Final State</span>{' '}
                    </li>
                </ul>
            </div>
        </div>
    );
};

const IntroEnding: React.FC = () => {
    return (
        <div className={`${classes['sorting-intro']} ${classes['sorting-intro-ending']}`}>
            <h2>Hope You Enjoy!</h2>
            <p className={classes['ending-p']}>
                Try adding more sections and compare the runtime of different algorithms!
            </p>
            <img
                src={SortingComparisonImage}
                alt="sorting comparison"
                className={classes.img}
            />
        </div>
    );
};

const IntroList: React.ReactNode[] = [
    <SortingIntro />,
    <SortingFunctionality />,
    <AlgorithmsIntro />,
    <ColorFirstHalf />,
    <IntroEnding />,
];

export default IntroList;
