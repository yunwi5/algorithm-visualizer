import React, { useState } from "react";

const ModalContext = React.createContext({
	showSortingModal: (show: boolean) => {},
	sortingModalVisible: false,
	showSearchModal: (show: boolean) => {},
	searchModalVisible: false
});

export default ModalContext;

export const ModalContextProvider: React.FC = (props) => {
	const [ sortingModalVisible, setSortingModalVisible ] = useState(true);
	const [ searchModalVisible, setSearchModalVisible ] = useState(true);

	const showSortingModal = (show: boolean) => {
		setSortingModalVisible(show);
	};

	const showSearchModal = (show: boolean) => {
		setSearchModalVisible(show);
	};

	const value = {
		sortingModalVisible,
		searchModalVisible,
		showSortingModal,
		showSearchModal
	};

	return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};
