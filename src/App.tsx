import React from "react";
import Layout from "./components/layout/Layout";
import SortingVisualizer from "./components/sorting-visualizer/SortingVisualizer";
import "./App.scss";

function App () {
	return (
		<div className="App">
			<Layout>
				<SortingVisualizer />
			</Layout>
		</div>
	);
}

export default App;
