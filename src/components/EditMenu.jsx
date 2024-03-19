import { useContext, useState } from "react";
import { popupContext } from "../context/popup.context";
import { formatDate } from "../utils/formatDate";
import getListToPaste from "../utils/getListToPaste";
import { Link } from "react-router-dom";
import './EditMenu.css';

const EditMenu = ({ event, participants, setShowEditMenu }) => {
    const { setShowPopup, setPopupMessage, setIsDeletePopup } = useContext(popupContext);
    const [closingMenu, setClosingMenu] = useState(false);

    const handleCloseEditMenu = () => {
        setClosingMenu(true);
        setTimeout(() => {
            setShowEditMenu(false);
        }, 700);
    };

    const displayDeletePopup = () => {
        setClosingMenu(true);
        setTimeout(() => {
            setShowEditMenu(false);
            setShowPopup(true);
            setPopupMessage('Estàs segur que vols eliminar aquest event?');
            setIsDeletePopup(true);
        }, 700);
    };

    return (
        <div onClick={handleCloseEditMenu} className={`overlay ${closingMenu && "fade-out-menu"}`}>
            <section className={`buttons-section ${closingMenu && "sliding-out"}`}>
                <span onClick={handleCloseEditMenu} className="close-edit-btn">✖️</span>
                <Link to={`/events/edit/${event._id}`}><button>📝 Editar</button></Link>
                <button onClick={() => { getListToPaste(event.name, formatDate(event.date), participants) }}>📋 Enviar per Whatsapp</button>
                <button onClick={() => displayDeletePopup()}>🗑️ Eliminar {event.name}</button>
            </section>
        </div>
    );
};

export default EditMenu;