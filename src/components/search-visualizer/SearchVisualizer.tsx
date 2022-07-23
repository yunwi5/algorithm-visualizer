import { useState, useEffect, useRef } from 'react';
import SearchSection from './search-section/SearchSection';
import SearchNav from './search-nav/SearchNav';
import UserControl from './search-nav/UserControl';
import { DEFAULT_ARR_SIZE, DEFAULT_SPEED } from '../../utilities/calc-util';
import { createRandomSearchArray } from '../../utilities/searching-util/search-util';
import classes from './SearchVisualizer.module.scss';
import { AlgorithmSectionRef } from '../../models/types';

const SearchVisualizer: React.FC = () => {
    const [speed, setSpeed] = useState(DEFAULT_SPEED);
    const [arraySize, setArraySize] = useState(DEFAULT_ARR_SIZE);
    const [isDuo, setIsDuo] = useState(true);

    const [target, setTarget] = useState(50);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(100);

    const initialArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
    const [searchArray, setSearchArray] = useState(initialArray);

    const [isBegin, setIsBegin] = useState(false);
    const [firstCompleted, setFirstCompleted] = useState(false);
    const [secondCompleted, setSecondCompleted] = useState(false);

    const firstSearchSectionRef = useRef<AlgorithmSectionRef>(null);
    const secondSearchSectionRef = useRef<AlgorithmSectionRef>(null);

    function randomizeArray() {
        const newArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
        setSearchArray(newArray);
    }

    function startHandler() {
        setIsBegin(true);
        firstSearchSectionRef.current?.start();
        secondSearchSectionRef.current?.start();
        setFirstCompleted(false);
        setSecondCompleted(false);
    }

    function resetStart(index: number) {
        if (index === 0) {
            setFirstCompleted(true);
        } else if (index === 1) {
            setSecondCompleted(true);
        }
    }

    // Force pausing of the animation execution of the simulation.
    function togglePause() {
        firstSearchSectionRef.current?.togglePause();
        secondSearchSectionRef.current?.togglePause();
    }

    // Force reset while the search sections are simulating their algorithms.
    function forceReset() {
        firstSearchSectionRef.current?.reset();
        secondSearchSectionRef.current?.reset();
        setIsBegin(false);
    }

    useEffect(() => {
        const newArray = createRandomSearchArray(arraySize, minNumber, maxNumber);
        setSearchArray(newArray);
    }, [arraySize, minNumber, maxNumber]);

    useEffect(() => {
        if (!isDuo && firstCompleted) {
            setIsBegin(false);
        }
        if (isDuo && firstCompleted && secondCompleted) {
            setIsBegin(false);
        }
    }, [isDuo, firstCompleted, secondCompleted]);

    return (
        <main className={classes['search-visualizer']}>
            <SearchNav
                isBegin={isBegin}
                onTogglePause={togglePause}
                onForceReset={forceReset}
                onChangeSize={(newSize: number) => setArraySize(newSize)}
                onChangeSpeed={(newSpeed: number) => setSpeed(newSpeed)}
                onChangeDuo={() => setIsDuo((prev) => !prev)}
                onRandomize={randomizeArray}
            />
            <div className={classes.content}>
                {!isBegin && (
                    <UserControl
                        onChangeTarget={(t: number) => setTarget(t)}
                        onChangeMin={(min: number) => setMinNumber(min)}
                        onChangeMax={(max: number) => setMaxNumber(max)}
                        onBegin={startHandler}
                    />
                )}
                <div className={classes.sections}>
                    <SearchSection
                        ref={firstSearchSectionRef}
                        isBegin={isBegin}
                        target={target}
                        speed={speed}
                        arraySize={arraySize}
                        initialArray={searchArray}
                        maxHeight={maxNumber}
                        onFinish={() => resetStart(0)}
                    />
                    {isDuo && (
                        <SearchSection
                            ref={secondSearchSectionRef}
                            isBegin={isBegin}
                            target={target}
                            speed={speed}
                            arraySize={arraySize}
                            initialArray={searchArray}
                            maxHeight={maxNumber}
                            onFinish={() => resetStart(1)}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default SearchVisualizer;
