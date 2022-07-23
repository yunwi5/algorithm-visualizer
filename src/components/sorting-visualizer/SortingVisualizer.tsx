import React, { useState, useEffect, useRef } from 'react';
import SortingNav from './sorting-nav/SortingNav';
import SortingSection from './sorting-section/SortingSection';

import SortingInfoButtons from './sorting-ui/SortingInfoButtons';
import { SortingBar } from '../../models/sorting-models/sorting-models';
import { createRandomSortingArray } from '../../utilities/sotring-util.ts/sorting-util';
import { DEFAULT_ARR_SIZE, DEFAULT_SPEED } from '../../utilities/calc-util';
import classes from './SortingVisualizer.module.scss';
import { AlgorithmSectionRef } from '../../models/types';

export const MAXIMUM_NUMBER_OF_SECTIONS = 4;

const SortingVisualizer: React.FC = () => {
    const [arraySize, setArraySize] = useState(DEFAULT_ARR_SIZE);
    const [sortingSpeed, setSortingSpeed] = useState(DEFAULT_SPEED);

    // Initial array and Sections management
    const [initialArray, setInitialArray] = useState<SortingBar[]>([]);
    const [showSections, setShowSections] = useState<boolean[]>([true, false, false, false]);
    const numSections = showSections.reduce((prev, curr) => prev + (curr ? 1 : 0), 0);

    // Start and finish point management
    const [isBegin, setIsBegin] = useState(false);
    const [firstCompleted, setFirstCompleted] = useState(false);
    const [secondCompleted, setSecondCompleted] = useState(false);
    const [thirdCompleted, setThirdCompleted] = useState(false);
    const [fourthCompleted, setFourthCompleted] = useState(false);

    // control refs
    const firstSortingSectionRef = useRef<AlgorithmSectionRef>(null);
    const secondSortingSectionRef = useRef<AlgorithmSectionRef>(null);
    const thirdSortingSectionRef = useRef<AlgorithmSectionRef>(null);
    const fourthSortingSectionRef = useRef<AlgorithmSectionRef>(null);
    const sortingRefs = [
        firstSortingSectionRef,
        secondSortingSectionRef,
        thirdSortingSectionRef,
        fourthSortingSectionRef,
    ];

    function sortingSectionsHandler() {
        const secs = [...showSections];
        const falseIndex = secs.findIndex((bool) => !bool);
        secs[falseIndex] = true;
        setShowSections(secs);
    }

    function closeSectionHandler(index: number) {
        const newShowSections = [...showSections];
        newShowSections[index] = false;
        setShowSections(newShowSections);
    }

    function startHandler(isBegin: boolean) {
        setIsBegin(isBegin);
        sortingRefs.forEach((sortingSection) => sortingSection.current?.start());
        setFirstCompleted(false);
        setSecondCompleted(false);
        setThirdCompleted(false);
        setFourthCompleted(false);
    }

    // called only when the simulation already started.
    function togglePause() {
        sortingRefs.forEach((ref) => ref.current?.togglePause());
    }

    function forceReset() {
        sortingRefs.forEach((ref) => ref.current?.reset());
    }

    function resetStart(index: number) {
        if (index === 0) {
            setFirstCompleted(true);
        } else if (index === 1) {
            setSecondCompleted(true);
        } else if (index === 2) {
            setThirdCompleted(true);
        } else {
            setFourthCompleted(true);
        }
    }

    useEffect(() => {
        const newArray = createRandomSortingArray(arraySize);
        setInitialArray(newArray);
    }, [arraySize]);

    useEffect(() => {
        const total = +firstCompleted + +secondCompleted + +thirdCompleted + +fourthCompleted;
        if (total >= numSections) {
            setIsBegin(false);
        }
    }, [numSections, firstCompleted, secondCompleted, thirdCompleted, fourthCompleted]);

    const sectionContainerClass =
        numSections >= 3
            ? classes['container-quarter']
            : numSections === 2
            ? classes['container-half']
            : '';

    return (
        <div>
            <main className={classes['sorting-visualizer']}>
                <SortingNav
                    isBegin={isBegin}
                    onTogglePause={togglePause}
                    onForceReset={forceReset}
                    onChangeArraySize={(size: number) => setArraySize(size)}
                    onChangeSortingSpeed={(speed: number) => setSortingSpeed(speed)}
                    onChangeStart={startHandler}
                    onAddSection={sortingSectionsHandler}
                    numberOfSections={numSections}
                />
                <div className={`${classes['sections-container']} ${sectionContainerClass}`}>
                    {showSections.map(
                        (bool, idx) =>
                            bool && (
                                <SortingSection
                                    ref={sortingRefs[idx]}
                                    key={idx}
                                    isBegin={isBegin}
                                    sortingSpeed={sortingSpeed}
                                    initialArray={initialArray}
                                    onFinish={resetStart.bind(null, idx)}
                                    onClose={closeSectionHandler.bind(null, idx)}
                                    numberOfSections={numSections}
                                />
                            ),
                    )}
                </div>
            </main>
            <SortingInfoButtons numSections={numSections} />
        </div>
    );
};

export default SortingVisualizer;
