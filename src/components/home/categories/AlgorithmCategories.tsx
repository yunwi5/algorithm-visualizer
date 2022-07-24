import { HomeImages } from '../../../constants';
import HomeTypeWriting from '../type-writing/HomeTypeWriting';
import AlgorithmCard from './AlgorithmCard';
import classes from './AlgorithmCategories.module.scss';

const AlgorithmCategories = () => {
    return (
        <section className={classes.container}>
            <h2>Categories of Algorithms</h2>
            <HomeTypeWriting />
            <div className={classes.list}>
                {AlgorithmSections.map((section) => (
                    <AlgorithmCard key={section.title} {...section} />
                ))}
            </div>
        </section>
    );
};

const AlgorithmSections = [
    {
        title: 'Sorting Visualizer',
        link: '/sorting',
        image: HomeImages.HomeSorting,
    },
    {
        title: 'Search Visualizer',
        link: '/searching',
        image: HomeImages.HomeSearching,
    },
    {
        title: 'Sudoku Solver',
        link: '/sudoku',
        image: HomeImages.HomeSudoku,
    },
];

export default AlgorithmCategories;
