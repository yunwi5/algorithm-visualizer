import AlgorithmCategories from './categories/AlgorithmCategories';
import HomeHeader from './header/HomeHeader';
import HomeMainContent from './intro/HomeIntro';
import classes from './HomeMain.module.scss';

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
