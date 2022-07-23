import Sidebar from '../../layout/sidebar/Sidebar';
import SudokuRangeSection from '../../graphs/graph-support/SudokuRangeSection';
import ToggleBar from '../../ui/ToggleBar';

import { Theme } from '../../../models/gen-model';
import { toSortingSpeed } from '../../../utilities/calc-util';
import classes from './SudokuNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons';
import { useState } from 'react';

interface Props {
    isBegin: boolean;
    onTogglePause(): void;
    onForceReset(): void;
    onChangeSpeed: (speed: number) => void;
    onBegin: () => void;
    onRandomize: () => void;
    onDuoToggle: () => void;
}

const SudokuNav: React.FC<Props> = (props) => {
    const {
        onChangeSpeed,
        isBegin,
        onBegin,
        onRandomize,
        onDuoToggle,
        onTogglePause,
        onForceReset,
    } = props;
    const [isPause, setIsPause] = useState(false);

    const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeSpeed(toSortingSpeed(value) / 3);
    };

    return (
        <nav className={`${classes['sodoku-nav']} ${classes['']}`}>
            <div className={classes.heading}>
                <Sidebar />
                <h3>Sudoku Visualizer</h3>
            </div>
            <div className={classes.controls}>
                <SudokuRangeSection onChangeSpeed={speedHandler} isBegin={isBegin} />
                <ToggleBar onChange={onDuoToggle} isBegin={isBegin} theme={Theme.PRIMARY} />
            </div>
            <div className={classes.buttons}>
                {!isBegin && (
                    <>
                        <button
                            onClick={onRandomize}
                            className={`${classes['btn']} ${classes['btn-fill']}`}
                            disabled={isBegin}
                        >
                            Randomize
                        </button>
                        <button
                            onClick={onBegin}
                            className={`${classes['btn']} ${classes['btn-empty']}`}
                            disabled={isBegin}
                        >
                            Start
                        </button>
                    </>
                )}
                {isBegin && (
                    <>
                        <button
                            onClick={() => {
                                onTogglePause();
                                setIsPause((ps) => !ps);
                            }}
                            className={`${classes['btn']} ${classes['btn-fill']}`}
                        >
                            {isPause ? 'Continue' : 'Pause'}
                        </button>
                        <button
                            onClick={onForceReset}
                            className={`${classes['btn']} ${classes['btn-empty']}`}
                        >
                            Reset
                        </button>
                    </>
                )}
                <FontAwesomeIcon className={classes['info-icon']} icon={faCircleInfo as any} />
            </div>
        </nav>
    );
};

export default SudokuNav;
