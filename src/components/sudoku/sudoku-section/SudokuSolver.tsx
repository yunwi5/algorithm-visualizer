import { useState, useMemo, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import SudokuGrid from '../../graphs/grid/SudokuGrid';
import { SudokuAction } from '../../../models/sudoku-model';
import { createCustomGrid } from '../../../utilities/sudoku-util/sudoku-util';
import { executeSudokuAction } from '../../../utilities/sudoku-util/sudoku-action-util';
import { getSudokuActions } from '../../../utilities/sudoku-util/sudoku-algo-util';
import { PlayMode } from '../../../models/sudoku-model';
import { AlgorithmSectionRef } from '../../../models/types';

interface Props {
    isBegin: boolean;
    speed: number;
    grid: number[][];
    onComplete: () => void;
    onTime: (time: number | null) => void;
}

const SudokuSolver: React.ForwardRefRenderFunction<AlgorithmSectionRef, Props> = (
    props,
    ref,
) => {
    const { grid, onComplete, isBegin, speed, onTime } = props;

    const customGrid = useMemo(() => createCustomGrid(grid), [grid]);
    const [sudokuGrid, setSudokuGrid] = useState(customGrid);
    const [actionsArray, setActionsArray] = useState<SudokuAction[]>([]);

    const pauseRef = useRef(false);
    const resetRef = useRef(false);
    useImperativeHandle(ref, () => ({
        togglePause: () => (pauseRef.current = !pauseRef.current),
        reset: () => (resetRef.current = true),
    }));

    useEffect(() => {
        const customGrid = createCustomGrid(grid);
        setSudokuGrid(customGrid);
        onTime(null);

        const getSudokuActionsAsync = async () => {
            const { actions } = await getSudokuActions(customGrid);
            setActionsArray(actions);
        };
        getSudokuActionsAsync();
    }, [onTime, grid]);

    const finishActions = (interval: ReturnType<typeof setInterval>) => {
        clearInterval(interval);
        onComplete();
        pauseRef.current = false;
        resetRef.current = false;
    };

    const reset = (interval: ReturnType<typeof setInterval>) => {
        finishActions(interval);
        setSudokuGrid(createCustomGrid(grid));
    };

    useEffect(() => {
        if (!isBegin) {
            return;
        } else {
            let index = 0,
                n = actionsArray.length;
            const startTime = performance.now();
            const interval = setInterval(() => {
                if (index > n - 1) {
                    finishActions(interval);
                    const endTime = performance.now();
                    return onTime(endTime - startTime);
                }
                if (resetRef.current) {
                    reset(interval);
                    return console.log('RESET!');
                }
                if (pauseRef.current) {
                    return console.log('PAUSE!');
                }
                const newGrid = executeSudokuAction(sudokuGrid, actionsArray[index]);
                setSudokuGrid((prevGrid) => newGrid);
                index++;
            }, speed);
        }
    }, [isBegin]);

    return <SudokuGrid grid={sudokuGrid} playMode={PlayMode.MACHINE} />;
};

export default forwardRef(SudokuSolver);
