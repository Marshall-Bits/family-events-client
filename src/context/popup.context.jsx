import { createContext, useState } from "react";

const popupContext = createContext();

const PopupProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isDeletePopup, setIsDeletePopup] = useState(false);

    return (
        <popupContext.Provider value={{
            showPopup,
            setShowPopup,
            popupMessage,
            setPopupMessage,
            isDeletePopup,
            setIsDeletePopup
        }}>
            {children}
        </popupContext.Provider>
    );
};

export { PopupProvider, popupContext };