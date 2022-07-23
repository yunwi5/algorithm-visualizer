import React from 'react';
import { SudokuImages } from '../../../constants';
import classes from './SudokuIntro.module.scss';

const SudokuIntro = () => {
    return (
        <div className={`${classes['section']} ${classes['sudoku-intro']}`}>
            <h2>Visualize Sudoku Puzzle</h2>
            <div className={classes['text-container']}>
                <p>
                    <span>
                        Sudoku is a really popular game for brain training as well as a nice
                        candidate to visualize dynamically. We support sudoku simulation with a{' '}
                        <strong>back-tracking algorithm</strong>, as well as a{' '}
                        <strong>user play mode</strong>.
                    </span>
                </p>
                <img
                    src={SudokuImages.SudokuIntro}
                    className={classes.img}
                    alt="sorting bar"
                />
            </div>
        </div>
    );
};

const SudokuAlgorithm = () => (
    <div className={`${classes['section']} ${classes['sudoku-algorithm']}`}>
        <h2>Algorithm That Solves Sudoku Puzzle</h2>
        <ul>
            <li>It automatically solves the puzzle by smartly guessting the next number.</li>
            <li>
                Instead of a brute-force approach that has 9<small>81</small> possible
                combinations, this algorithm abandons invalid possibilities that never lead to
                the solvable board.
            </li>
            <li>
                This approach implements so called <strong>back tracking system</strong> that
                is able to back track its decisions and change its previous decisions until the
                algorithm finds the correct solution.
            </li>
        </ul>
    </div>
);

const UserMode = () => (
    <div className={`${classes['section']} ${classes['user-mode']}`}>
        <h2>User Mode Support</h2>
        <div className={`${classes['sub-section']} ${classes['user-message']}`}>
            <p>Get hints for invalid inputs.</p>
            <img
                src={SudokuImages.SudokuUserMessage}
                className={classes.img}
                alt="Sudoku user message"
            />
        </div>
        <div className={classes['sub-section']}>
            <p>
                The purpose is to let you solve the puzzle by yourself and improve your problem
                solving skills!
            </p>
            <img
                src={SudokuImages.SudokuUserMode}
                className={classes.img}
                alt="Sudoku user message"
            />
        </div>
    </div>
);

const SudokuIntroList: React.ReactNode[] = [
    <SudokuIntro />,
    <SudokuAlgorithm />,
    <UserMode />,
];

export default SudokuIntroList;
