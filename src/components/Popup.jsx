import './Popup.css';
import { useContext, useState } from 'react';
import { popupContext } from '../context/popup.context';
import { useNavigate } from 'react-router-dom';

const Popup = () => {
    const { setShowPopup, popupMessage } = useContext(popupContext);
    const [disappear, setDisappear] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        setDisappear(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 700);
    };


    return (
        <section className={`overlay ${disappear && "fading-out"}`}>
            <div className={`popup-container ${disappear && "disappearing"}`}>
                <p>{popupMessage}</p>
                <button onClick={() => handleClick()} className='ok button'>👍</button>
            </div>
        </section>
    );
}

export default Popup;