import { useEffect, useRef, useMemo } from 'react';
import { Typewriter } from '../../../models/TypeWriter';
import classes from './HomeIntro.module.scss';

async function executeTypeWritingInOrder(writers: Typewriter[]) {
    for (const writer of writers) {
        writer.currentElement.classList.add(classes['active']);
        await writer.start();
        await new Promise<void>((resolve) => {
            const timer = setTimeout(() => {
                resolve();
                clearTimeout(timer);
            }, 200);
        });
        writer.currentElement.classList.remove(classes['active']);
    }
}

const HomeMainContent = () => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const p1Ref = useRef<HTMLParagraphElement>(null);
    const p2Ref = useRef<HTMLParagraphElement>(null);
    const elementRefs = useMemo(() => [headingRef, p1Ref, p2Ref], []);

    useEffect(() => {
        if (!headingRef.current || !p1Ref.current || !p2Ref.current) return;
        const writers: Typewriter[] = [];
        for (let i = 0; i < elementRefs.length; i++) {
            const ref = elementRefs[i];
            const quote = quotes[i];
            const typeWriter = new Typewriter(ref.current as HTMLElement, {});
            typeWriter.typeString(quote);
            writers.push(typeWriter);
        }
        executeTypeWritingInOrder(writers);
    }, [elementRefs]);

    return (
        <div className={classes.content}>
            <h1 ref={headingRef}></h1>
            <div className={classes.paragraphs}>
                <p ref={p1Ref}></p>
                <p ref={p2Ref}></p>
            </div>
        </div>
    );
};

const headingMessage = 'Simulate Algorithms';
const paragraphs = [
    'Visualize popular sorting, searching and sudoku algorithms with feature-rich user interactions.',
    'Understand algorithms and compare the runtime & space complexity.',
];
const quotes = [headingMessage, ...paragraphs];

export default HomeMainContent;
