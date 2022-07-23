import AlgorithmCategories from './categories/AlgorithmCategories';
import HomeHeader from './header/HomeHeader';
import classes from './HomeMain.module.scss';

const HomeMainContent = () => (
    <div className={classes.content}>
        <h1>Simulate Algorithms</h1>
        <div className={classes.paragraphs}>
            <p>
                Visualize popular sorting, searching and sudoku algorithms with feature-rich
                user interactions.
            </p>
            <p>Understand algorithms and compare the runtime & space complexity.</p>
        </div>
    </div>
);

const HomeMain = () => {
    return (
        <div className={classes.home}>
            <main className={classes.main}>
                <HomeHeader />
                <HomeMainContent />
            </main>
            <AlgorithmCategories />
        </div>
    );
};

export default HomeMain;
