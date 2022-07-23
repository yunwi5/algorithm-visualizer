import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SortingPage from './pages/visualizer/SortingPage';
import SearchingPage from './pages/visualizer/SearchingPage';
import SudokuPage from './pages/visualizer/SudokuPage';
import HomePage from './pages/HomePage';
import './App.scss';

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className={`App ${isHome ? 'home' : ''}`}>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sorting" element={<SortingPage />} />
                    <Route path="/searching" element={<SearchingPage />} />
                    <Route path="/sudoku" element={<SudokuPage />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
