import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalContextProvider } from "./store/modal-context";
import "./index.scss";

ReactDOM.render(
	<ModalContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ModalContextProvider>,
	document.getElementById("root")
);
