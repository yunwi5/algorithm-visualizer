import Bar from './Bar';
import { SortingBar } from '../../models/sorting-models/sorting-models';
import { SearchBar } from '../../models/search-model';
import classes from './BarList.module.scss';
import { MAX_BAR_HEIGHT } from '../../utilities/sotring-util.ts/sorting-util';

interface Props {
    barArray: SortingBar[] | SearchBar[];
    speed: number;
    arraySize: number;
    maxHeight?: number;
}

const BarList: React.FC<Props> = (props) => {
    const { barArray, speed, arraySize, maxHeight = MAX_BAR_HEIGHT } = props;

    return (
        <div className={classes['bar-container']}>
            {barArray.map((bar, idx) => (
                <Bar
                    key={idx}
                    arraySize={arraySize}
                    bar={bar}
                    speed={speed}
                    maxHeight={maxHeight}
                />
            ))}
        </div>
    );
};

export default BarList;
