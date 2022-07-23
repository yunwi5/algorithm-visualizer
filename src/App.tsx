import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.scss';
import Spinner from './components/ui/Spinner';

const SortingPage = lazy(() => import('./pages/visualizer/SortingPage'));
const SearchingPage = lazy(() => import('./pages/visualizer/SearchingPage'));
const SudokuPage = lazy(() => import('./pages/visualizer/SudokuPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
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
    );
}

export default App;
