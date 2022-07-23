import { useRef, useState } from 'react';
import SudokuNav from './sudoku-nav/SudokuNav';
import SudokuSection from './sudoku-section/SudokuSection';
import { DEFAULT_SPEED } from '../../utilities/calc-util';
import { DEFAULT_GRID, getRandomGrid } from '../../utilities/sudoku-util/create-sudoku-util';
import { AlgorithmSectionRef } from '../../models/types';
import classes from './SudokuMain.module.scss';

const SudokuMain: React.FC = () => {
    const [isBegin, setIsBegin] = useState(false);
    const [speed, setSpeed] = useState(DEFAULT_SPEED);
    const [grid, setGrid] = useState<number[][]>(DEFAULT_GRID);
    const [isDuo, setIsDuo] = useState(false);

    const firstSudokuSectionRef = useRef<AlgorithmSectionRef>(null);
    const secondSudokuSectionRef = useRef<AlgorithmSectionRef>(null);

    const randomizeGrid = () => setGrid(getRandomGrid());

    const startHandler = () => {
        setIsBegin(true);
        firstSudokuSectionRef.current?.start();
        secondSudokuSectionRef.current?.start();
    };

    // called when forcing pause of the current sudoku simulation.
    function togglePause() {
        firstSudokuSectionRef.current?.togglePause();
        secondSudokuSectionRef.current?.togglePause();
    }

    // called when forcing reset of the current simulations and get back to initial state.
    function forceReset() {
        firstSudokuSectionRef.current?.reset();
        secondSudokuSectionRef.current?.reset();
    }

    return (
        <main className={classes['sudoku-main']}>
            <SudokuNav
                isBegin={isBegin}
                onTogglePause={togglePause}
                onForceReset={forceReset}
                onChangeSpeed={(speed: number) => setSpeed(speed)}
                onBegin={startHandler}
                onRandomize={randomizeGrid}
                onDuoToggle={() => setIsDuo((prev) => !prev)}
            />
            <div className={classes.container}>
                <SudokuSection
                    ref={firstSudokuSectionRef}
                    isBegin={isBegin}
                    speed={speed}
                    initialGrid={grid}
                    onComplete={() => setIsBegin(false)}
                />
                {isDuo && (
                    <SudokuSection
                        ref={secondSudokuSectionRef}
                        isBegin={isBegin}
                        speed={speed}
                        initialGrid={grid}
                        onComplete={() => setIsBegin(false)}
                    />
                )}
            </div>
        </main>
    );
};

export default SudokuMain;
