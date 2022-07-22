import React, { useContext, useState } from 'react';

const ModalContext = React.createContext({
    showSortingModal: (show: boolean) => {},
    sortingModalVisible: false,
    showSearchModal: (show: boolean) => {},
    searchModalVisible: false,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC = (props) => {
    // const [ defaultShown, setDefaultShown ] = useState(false);
    const [sortingModalVisible, setSortingModalVisible] = useState(false);
    const [searchModalVisible, setSearchModalVisible] = useState(false);

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
        showSearchModal,
    };

    return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};

export default ModalContext;
