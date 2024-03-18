import { createContext, useState } from "react";

const popupContext = createContext();

const PopupProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    return (
        <popupContext.Provider value={{ showPopup, setShowPopup, popupMessage, setPopupMessage }}>
            {children}
        </popupContext.Provider>
    );
};

export { PopupProvider, popupContext};