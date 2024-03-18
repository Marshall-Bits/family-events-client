import './AddParticipantMenu.css';
import { useContext, useState } from 'react';
import { addParticipantsContext } from '../context/participant.context';

const AddParticipantMenu = ({ availableParticipants, addParticipants }) => {
    const { setShowParticipantsMenu } = useContext(addParticipantsContext);
    const [participantsToAdd, setParticipantsToAdd] = useState([]);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleFadeOut = () => {
        setIsFadingOut(true);
        addParticipants(participantsToAdd)
        setTimeout(() => {
            setShowParticipantsMenu(false);
        }, 300);
    };

    const handleCheckBox = (e, id) => {
        if (e.target.checked) {
            setParticipantsToAdd([...participantsToAdd, id])
        }
        else {
            setParticipantsToAdd(participantsToAdd.filter((participantId) => participantId !== id));
        }
    };

    return (
        <div className={`add-participant-container ${isFadingOut ? "fade-out-menu" : "fade-in-menu"}`}>
            <ul>
                {availableParticipants.map((participant) => (
                    <li className="li-participant" key={participant._id}>
                        <input onChange={(e) => handleCheckBox(e, participant._id)} type="checkbox" />
                        <img className="avatar" src={participant.imageUrl} alt="" />
                        <p>
                            {participant.name}
                        </p>
                    </li>
                ))}
            </ul>
            <button className='add-and-close-btn' onClick={() => handleFadeOut()}>➕</button>
        </div>
    );
};

export default AddParticipantMenu;