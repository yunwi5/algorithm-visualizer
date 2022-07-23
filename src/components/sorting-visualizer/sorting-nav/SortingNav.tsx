import React, { Fragment, useState, useEffect, useContext } from 'react';
import Sidebar from '../../layout/sidebar/Sidebar';
import RangeSection from '../../graphs/graph-support/RangeSection';
import ModalContext from '../../../store/modal-context';
import { toSortingSpeed } from '../../../utilities/calc-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons';
import classes from './SortingNav.module.scss';

interface Props {
    isBegin: boolean;
    onTogglePause(): void;
    onForceReset(): void;
    onChangeArraySize: (size: number) => void;
    onChangeSortingSpeed: (speed: number) => void;
    onChangeStart: (isBegin: boolean) => void;
    onAddSection: () => void;
    numberOfSections: number;
}

const SortingNav: React.FC<Props> = (props) => {
    const {
        isBegin,
        onTogglePause,
        onForceReset,
        onChangeArraySize,
        onChangeSortingSpeed,
        onChangeStart,
        onAddSection,
        numberOfSections,
    } = props;

    const { showModal: showSortingModal } = useContext(ModalContext);
    const [userErrMessage, setUserErrMessage] = useState<string | null>(null);
    const [isPause, setIsPause] = useState(false);

    // size between 5 and 100!
    function arrSizeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);
        onChangeArraySize(value);
    }

    // Sorting speed in ms!
    // sorting range between x1 and x100!
    function sortSpeedHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);
        onChangeSortingSpeed(toSortingSpeed(value));
    }

    // Maximum 4 sections at a time!
    function addSectionHandler() {
        if (numberOfSections <= 3) {
            onAddSection();
        } else {
            setUserErrMessage('Maximum 4 sections!');
        }
    }

    function togglePause() {
        onTogglePause();
        setIsPause((ps) => !ps);
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setUserErrMessage(null);
        }, 1000);
        return () => clearTimeout(timer);
    }, [userErrMessage]);

    const sectionContainerClass =
        numberOfSections >= 3
            ? classes['nav-quarter']
            : numberOfSections === 2
            ? classes['nav-half']
            : '';

    return (
        <nav className={`${classes['sorting-nav']} ${sectionContainerClass}`}>
            <div className={classes.heading}>
                <Sidebar />
                <h3>Sorting Visualizer</h3>
            </div>

            <RangeSection
                onChangeSize={arrSizeHandler}
                onChangeSpeed={sortSpeedHandler}
                isBegin={isBegin}
            />

            <div className={classes.buttons}>
                {!isBegin && (
                    <Fragment>
                        {!userErrMessage && (
                            <button
                                className={classes['btn-empty']}
                                onClick={addSectionHandler}
                            >
                                Add New +
                            </button>
                        )}
                        {userErrMessage && (
                            <p className={classes['err-message']}>{userErrMessage}</p>
                        )}
                    </Fragment>
                )}
                {!isBegin && (
                    <button
                        className={classes['btn-fill']}
                        onClick={onChangeStart.bind(null, true)}
                    >
                        Start!
                    </button>
                )}
                {!isBegin && (
                    <FontAwesomeIcon
                        onClick={showSortingModal.bind(null, true)}
                        className={classes['info-icon']}
                        icon={faCircleInfo as IconProp}
                    />
                )}
                {isBegin && (
                    <>
                        <button onClick={togglePause} className={classes['btn-fill']}>
                            {isPause ? 'Continue' : 'Pause'}
                        </button>
                        <button onClick={onForceReset} className={classes['btn-empty']}>
                            Reset
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default SortingNav;
