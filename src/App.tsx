import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SortingPage from "./pages/visualizer/SortingPage";
import SearchingPage from "./pages/visualizer/SearchingPage";
import HomePage from "./pages/HomePage";
import "./App.scss";

function App () {
	return (
		<div className="App">
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate replace to="/sorting" />} />
					<Route path="/sorting" element={<SortingPage />} />
					<Route path="/searching" element={<SearchingPage />} />
				</Routes>
			</Layout>
		</div>
	);
}

export default App;
