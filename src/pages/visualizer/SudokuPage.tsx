import { Helmet } from 'react-helmet';
import SudokuMain from '../../components/sudoku/SudokuMain';
import IntroModal from '../../components/ui/IntroModal';
import { useModalContext } from '../../store/modal-context';
import SudokuIntroList from '../../components/sudoku/sudoku-intro/SudokuIntro';

const SudokuPage: React.FC = () => {
    const { modalVisible, showModal } = useModalContext();

    return (
        <>
            <Helmet>
                <title>Sudoku Visualizer</title>
                <meta
                    name="description"
                    content="Visualize sudoku puzzle. Use sudoku solver to solve the sudoku puzzle automatically or use user mode to solve it by yourself."
                />
            </Helmet>
            <SudokuMain />
            {modalVisible && (
                <IntroModal introJsxList={SudokuIntroList} onClose={() => showModal(false)} />
            )}
        </>
    );
};

export default SudokuPage;
