import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import HomeMain from '../components/home/HomeMain';

const HomePage: React.FC = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Algo Visualizer</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Algorithm Visualizer for sorting, searching, path finding and more."
                />
            </Helmet>
            <HomeMain />
        </Fragment>
    );
};

export default HomePage;
