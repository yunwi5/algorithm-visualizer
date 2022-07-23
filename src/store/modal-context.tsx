import React, { useContext, useState } from 'react';

const ModalContext = React.createContext({
    showModal: (show: boolean) => {},
    modalVisible: false,
});

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider: React.FC = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const value = {
        modalVisible,
        showModal: (show: boolean) => setModalVisible(show),
    };

    return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
};

export default ModalContext;
