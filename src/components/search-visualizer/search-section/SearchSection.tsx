import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import {
    SearchBar,
    SearchAlgorithm,
    SearchAction,
    ActionState,
} from '../../../models/search-model';
import BarList from '../../graphs/BarList';
import SearchSelect from './SearchSelect';
import { getSearchActions } from '../../../utilities/searching-util/search-algo-util';
import { executeSearchAction } from '../../../utilities/searching-util/search-action-util';
import { createDeepArrayCopy } from '../../../utilities/list-util';
import { getTimeElapsedInFormat } from '../../../utilities/calc-util';
import classes from './SearchSection.module.scss';
import { AlgorithmSectionRef } from '../../../models/types';

interface Props {
    isBegin: boolean;
    initialArray: SearchBar[];
    target: number;
    speed: number;
    arraySize: number;
    maxHeight: number;
    onFinish: () => void;
}

const SearchSection: React.ForwardRefRenderFunction<AlgorithmSectionRef, Props> = (
    props,
    ref,
) => {
    const { isBegin, initialArray, target, speed, arraySize, maxHeight, onFinish } = props;

    const [searchArray, setSearchArray] = useState(createDeepArrayCopy(initialArray));
    const [algorithm, setAlgorithm] = useState(SearchAlgorithm.BINARY_SEARCH);
    const [animationActions, setAnimationActions] = useState<SearchAction[]>([]);

    const [userMessage, setUserMessage] = useState<string | null>(null);
    const [timeTaken, setTimeTaken] = useState<number | null>(null);

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

    useEffect(() => {
        const newArray = createDeepArrayCopy(initialArray);
        setSearchArray(newArray);
        setUserMessage(null);
    }, [algorithm, initialArray, target]);

    function stopInterval(interval: ReturnType<typeof setInterval>) {
        clearInterval(interval);
        setAnimationActions([]);
        onFinish();
        if (algorithm === SearchAlgorithm.BINARY_SEARCH) {
            console.log('False to pause and reset');
        }
        clearRefs();
    }

    function reset(interval: ReturnType<typeof setInterval>) {
        stopInterval(interval);
        setSearchArray(createDeepArrayCopy(initialArray));
    }

    function executeAlgorithm() {
        clearRefs();
        const startTIme = performance.now();
        let index = 0;
        let interval = setInterval(() => {
            if (index >= animationActions.length) {
                stopInterval(interval);
                const finishTime = performance.now();
                setTimeTaken(finishTime - startTIme);
                return;
            }
            if (resetRef.current) {
                reset(interval);
                return console.log('RESET!');
            }
            if (pauseRef.current) {
                return console.log('PAUSE!');
            }
            const action = animationActions[index];
            const newArray = executeSearchAction(searchArray, action, algorithm);
            setSearchArray((prev) => newArray);

            if (action.action === ActionState.FINAL_VALID) {
                setUserMessage(`Target found at index ${action.current}!`);
            } else if (action.action === ActionState.FINAL_INVALID) {
                setUserMessage('Not Found!');
            }
            index++;
        }, speed);
    }

    useEffect(() => {
        // Do not re-create animation actions when the simulation is in progress.
        if (isBegin) return;
        const newSearchActions = getSearchActions(searchArray, algorithm, target);
        setAnimationActions(newSearchActions);
    }, [searchArray, algorithm, isBegin, target]);

    const sectionClass = isBegin ? classes['section-long'] : '';

    return (
        <section className={`${classes['search-section']} ${sectionClass}`}>
            <SearchSelect
                algorithm={algorithm}
                onChangeAlgorithm={(newAlgo: SearchAlgorithm) => setAlgorithm(newAlgo)}
            />
            {userMessage && (
                <p>
                    <span>{getTimeElapsedInFormat(timeTaken || 1)}s taken.</span> &ensp;{' '}
                    {userMessage}
                </p>
            )}
            <BarList
                speed={speed}
                arraySize={arraySize}
                barArray={searchArray}
                maxHeight={maxHeight}
            />
        </section>
    );
};

export default forwardRef(SearchSection);
