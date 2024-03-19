import './Popup.css';
import { useContext, useState } from 'react';
import { popupContext } from '../context/popup.context';
import { useNavigate, useParams } from 'react-router-dom';
import { eventsService } from '../services/services';

const Popup = () => {
    const { setShowPopup, popupMessage, setPopupMessage, setIsDeletePopup, isDeletePopup } = useContext(popupContext);
    const [disappear, setDisappear] = useState(false);
    const navigate = useNavigate();
    const { eventId } = useParams();

    const deleteEvent = () => {
        eventsService.delete(eventId)
            .then((response) => {
                setShowPopup(true);
                setPopupMessage("L'event s'ha eliminat")
            })
            .catch((error) => {
                setShowPopup(true);
                setPopupMessage("Hi ha hagut un error, intenta-ho més tard")
            });
    };

    const handleAccept = () => {
        navigate('/');
        setDisappear(true);
        isDeletePopup && deleteEvent();
        setTimeout(() => {
            setShowPopup(false);
            setIsDeletePopup(false);
        }, 700);
    };

    const handleCancel = () => {
        setDisappear(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 700);
    };


    return (
        <section className={`overlay ${disappear && "fading-out"}`}>
            <div className={`popup-container ${disappear && "disappearing"}`}>
                <p>{popupMessage}</p>
                {isDeletePopup && <button onClick={() => handleCancel()} className='cancel-btn'>👎</button>}
                <button onClick={() => handleAccept()} className='ok'>👍</button>
            </div>
        </section>
    );
}

export default Popup;