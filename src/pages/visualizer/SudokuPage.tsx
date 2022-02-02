import React from "react";
import { Helmet } from "react-helmet";
import SudokuMain from "../../components/sudoku/SudokuMain";

const SudokuPage: React.FC = () => {
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
		</>
	);
};

export default SudokuPage;
