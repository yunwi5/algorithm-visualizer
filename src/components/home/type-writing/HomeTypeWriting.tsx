import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolume } from '@fortawesome/pro-duotone-svg-icons';
import { Typewriter } from '../../../models/TypeWriter';
import classes from './HomeTypeWriting.module.scss';

const HomeTypeWriting: React.FC = () => {
    const typerRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!typerRef.current) return;
        const typeWriter = new Typewriter(typerRef.current, { loop: true, typingSpeed: 60 });
        for (const quote of TypeQuotes) {
            typeWriter.typeString(quote.text).pauseFor(1000).deleteAll();
        }
        typeWriter.start();
    }, []);

    return (
        <section className={classes['container']}>
            <FontAwesomeIcon icon={faVolume as any} className={classes.icon} />
            <p ref={typerRef}></p>
            <span className={classes['type-toggler']}>|</span>
        </section>
    );
};

const TypeQuotes = [
    { text: 'Sorting algorithms are fun!' },
    { text: 'BubbleSort is the easiest sorting algorithm.' },
    { text: 'QuickSort is fun to implement!' },
    { text: 'Compare the runtime of the sorting algorithms side by side!' },
    { text: 'BinarySearch is far faster than the linear search!' },
    { text: 'Compare the runtime of BinarySearch and LinearSearch side by side!' },
    { text: 'Look at the algorithm solving the sudoku puzzle by itself!' },
    { text: 'Or, solve the sudoku puzzle by yourself!' },
];

export default HomeTypeWriting;
