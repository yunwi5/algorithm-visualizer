import { useRef } from 'react';
import { Theme } from '../../../models/gen-model';
import {
    DEFAULT_ARR_SIZE,
    DEFAULT_SPEED,
    sortingSpeedToRange,
} from '../../../utilities/calc-util';
import classes from './RangeSection.module.scss';

interface Props {
    onChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSpeed: (e: React.ChangeEvent<HTMLInputElement>) => void;
    theme?: Theme;
    isBegin?: boolean;
}
const RangeSection: React.FC<Props> = (props) => {
    const { onChangeSize, onChangeSpeed, theme = Theme.PRIMARY, isBegin } = props;

    const speedRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null);

    return (
        <section className={`${classes['control-section']} ${classes[theme]}`}>
            <div className={classes.control}>
                <label htmlFor="array-size">Array Size</label>
                <input
                    name="array-size"
                    id="array-size"
                    type="range"
                    min="5"
                    max="300"
                    ref={sizeRef}
                    defaultValue={DEFAULT_ARR_SIZE}
                    onChange={onChangeSize}
                    disabled={isBegin}
                />
                {sizeRef.current && (
                    <div className={classes.circle}>{sizeRef.current!.value}</div>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="sorting-speed">Speed</label>
                <input
                    name="sorting-speed"
                    id="sorting-speed"
                    type="range"
                    min="1"
                    max="100"
                    ref={speedRef}
                    defaultValue={sortingSpeedToRange(DEFAULT_SPEED)}
                    onChange={onChangeSpeed}
                    disabled={isBegin}
                />
                {speedRef.current && (
                    <div className={classes.circle}>{speedRef.current!.value}</div>
                )}
            </div>
        </section>
    );
};

export default RangeSection;
