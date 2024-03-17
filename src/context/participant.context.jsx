import { createContext, useState } from "react";

const addParticipantsContext = createContext();

const AddParticipantsProvider = ({ children }) => {
    const [showParticipantsMenu, setShowParticipantsMenu] = useState(false);

    return (
        <addParticipantsContext.Provider value={{ showParticipantsMenu, setShowParticipantsMenu }}>
            {children}
        </addParticipantsContext.Provider>
    );
};

export { AddParticipantsProvider, addParticipantsContext };