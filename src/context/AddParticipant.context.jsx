import { createContext, useState } from "react";

const AddParticipantContext = createContext();

const AddParticipantProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <AddParticipantContext.Provider value={{ showMenu, setShowMenu }}>
            {children}
        </AddParticipantContext.Provider>
    );
};

export default AddParticipantProvider;