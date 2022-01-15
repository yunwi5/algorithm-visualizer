import React from "react";
import Layout from "./components/layout/Layout";
import SortingPage from "./pages/visualizer/SortingPage";
import "./App.scss";

function App () {
	return (
		<div className="App">
			<Layout>
				<SortingPage />
			</Layout>
		</div>
	);
}

export default App;
