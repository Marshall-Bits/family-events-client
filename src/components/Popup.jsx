import './Popup.css';
import { useContext, useState } from 'react';
import { popupContext } from '../context/popup.context';
import { useNavigate, useLocation } from 'react-router-dom';
import { eventsService } from '../services/services';

const Popup = () => {
    const { setShowPopup, popupMessage, setPopupMessage, setIsDeletePopup, isDeletePopup } = useContext(popupContext);
    const [disappear, setDisappear] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const deleteEvent = () => {
        const eventId = location.pathname.split('/').pop();
        eventsService.delete(eventId)
            .then(() => {
                setIsDeletePopup(false);
                setShowPopup(true);
                setPopupMessage("Quedada eliminada!")
            })
            .catch(() => {
                setShowPopup(true);
                setPopupMessage("Hi ha hagut un error, intenta-ho més tard")
            });
    };

    const handleAccept = () => {
        !isDeletePopup && navigate('/');
        setDisappear(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsDeletePopup(false);
            isDeletePopup && deleteEvent();
        }, 700);
    };

    const handleCancel = () => {
        setIsDeletePopup(false);
        setDisappear(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 700);
    };


    return (
        <section className={`overlay ${disappear && "fading-out"}`}>
            <div className={`popup-container ${disappear && "disappearing"}`}>
                <p>{popupMessage}</p>
                <button className="yes-btn" onClick={() => handleAccept()} >Vale</button>
                {isDeletePopup && <button onClick={() => handleCancel()} className='no-btn'>No pas</button>}
            </div>
        </section>
    );
}

export default Popup;