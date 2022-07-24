import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Spinner from './components/ui/Spinner';
import { APP_AUTHOR, APP_NAME } from './constants';
import './App.scss';

// Lazy loading
const SortingPage = lazy(() => import('./pages/visualizer/SortingPage'));
const SearchingPage = lazy(() => import('./pages/visualizer/SearchingPage'));
const SudokuPage = lazy(() => import('./pages/visualizer/SudokuPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
    const isHome = useLocation().pathname === '/';

    return (
        <>
            <Helmet>
                {/* Default Head Tags */}
                <title>{APP_NAME}</title>
                <meta
                    name="description"
                    content={`${APP_NAME} application that simulates popular algorithms such as sorting algorithms, searching algorithms and sudoku back tracking algorithm.`}
                />
                <meta
                    name="keywords"
                    content="ALGORITHM, VISUALIZATION, SIMULATION, SORTING, SEARCHING, SUDOKU, TIME COMPLEXITY"
                />
                <meta name="author" content={APP_AUTHOR} />
            </Helmet>
            <div className={`App ${isHome ? 'home' : ''}`}>
                <Layout>
                    <Suspense
                        fallback={
                            <div className="fallback">
                                <Spinner />
                            </div>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/sorting" element={<SortingPage />} />
                            <Route path="/searching" element={<SearchingPage />} />
                            <Route path="/sudoku" element={<SudokuPage />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </div>
        </>
    );
}

export default App;
