import { useState, forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import SectionNav from './SectionNav';
import SortingSummary from '../sorting-ui/SortingSummary';
import BarList from '../../graphs/BarList';
import {
    SortingAlgorithm,
    SortingAction,
    Action,
    SortingBar,
} from '../../../models/sorting-models/sorting-models';
import { createRandomSortingArray } from '../../../utilities/sotring-util.ts/sorting-util';
import { createDeepArrayCopy } from '../../../utilities/list-util';
import { getSortingActions } from '../../../utilities/sotring-util.ts/sorting-algo-util';
import { executeSortingAction } from '../../../utilities/sotring-util.ts/sorting-action-util';
import classes from './SortingSection.module.scss';
import { AlgorithmSectionRef } from '../../../models/types';

interface Props {
    isBegin: boolean;
    sortingSpeed: number;
    initialArray: SortingBar[];
    numberOfSections: number;
    onFinish: () => void;
    onClose: () => void;
}

const SortingSection: React.ForwardRefRenderFunction<AlgorithmSectionRef, Props> = (
    props,
    ref,
) => {
    const { sortingSpeed, isBegin, initialArray, numberOfSections, onFinish, onClose } = props;
    // Domain sorting algorithm
    const [algorithm, setAlgorithm] = useState(SortingAlgorithm.BubbleSort);

    // Sorting array & actions
    const [sortingArray, setSortingArray] = useState<SortingBar[]>(
        createDeepArrayCopy(initialArray),
    );
    const [animationActions, setAnimationActions] = useState<SortingAction[]>([]);

    // Comparisons & swaps operations counter
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState<number | null>(null);

    const pauseRef = useRef(false);
    const resetRef = useRef(false);
    useImperativeHandle(ref, () => ({
        togglePause: () => (pauseRef.current = !pauseRef.current),
        reset: () => (resetRef.current = true),
        start: executeAlgorithm,
    }));

    function clearRefs() {
        pauseRef.current = false;
        resetRef.current = false;
    }

    function clearStats() {
        setComparisons(0);
        setSwaps(0);
        setTimeElapsed(null);
    }

    // Randomize Internally
    function randomizeArray() {
        const newRandomArray = createRandomSortingArray(initialArray.length);
        setSortingArray(newRandomArray);
        clearStats();
    }

    // Array size change Externally
    useEffect(() => {
        // The reference of the Bar objects between SortingSection should not be the same.
        // Not only the copy of array, but also the deep copy of all objects are required.
        const newRandomArray = createDeepArrayCopy(initialArray);
        setSortingArray(newRandomArray);
        clearStats();
    }, [initialArray, algorithm]);

    const stopInterval = (interval: ReturnType<typeof setInterval>) => {
        clearInterval(interval);
        setAnimationActions([]);
        onFinish();
        // pause back to false, so that next turn simulation can run.
        // reset back to false, so that next turn simulation can run.
        clearRefs();
    };

    const reset = (interval: ReturnType<typeof setInterval>) => {
        stopInterval(interval);
        // create deepcopy again to prevent modifying initialArray
        setSortingArray(createDeepArrayCopy(initialArray));
    };

    function executeAlgorithm() {
        clearRefs();
        clearStats();
        const startTime = performance.now();
        let index = 0;
        let interval = setInterval(() => {
            if (index === animationActions.length) {
                stopInterval(interval);
                const finishTime = performance.now();
                return setTimeElapsed(finishTime - startTime);
            }
            if (resetRef.current) {
                reset(interval);
                return console.log('RESET!');
            }
            if (pauseRef.current) {
                return console.log('PAUSE!');
            }
            let action = animationActions[index];
            const newArray = executeSortingAction(sortingArray, action, algorithm);
            setSortingArray((prevArr) => newArray);

            if (action.action === Action.PEND) {
                setComparisons((prev) => prev + 1);
            } else if (action.action === Action.SWAP) {
                setSwaps((prev) => prev + 1);
            }
            index++;
        }, sortingSpeed);
    }

    useEffect(() => {
        // Do not re-create animation actions when the simulation is in progress.
        if (isBegin) return;
        // Get new sorting animation actions
        const sortingActions = getSortingActions(sortingArray, algorithm);
        setAnimationActions(sortingActions);
    }, [sortingArray, algorithm, isBegin]);

    const sectionSizeClass =
        numberOfSections >= 3
            ? classes['section-quarter']
            : numberOfSections === 2
            ? classes['section-half']
            : '';

    return (
        <section className={`${classes['sorting-section']} ${sectionSizeClass}`}>
            <SectionNav
                algorithm={algorithm}
                isBegin={isBegin}
                onClose={onClose}
                numberOfSections={numberOfSections}
                onChangeAlgorithm={(algo: SortingAlgorithm) => setAlgorithm(algo)}
                onRandomize={randomizeArray}
            />

            <BarList
                arraySize={initialArray.length}
                speed={sortingSpeed}
                barArray={sortingArray}
            />

            <SortingSummary
                arraySize={initialArray.length}
                comparisons={comparisons}
                swaps={swaps}
                timeElapsed={timeElapsed}
            />
        </section>
    );
};

export default forwardRef(SortingSection);
