import React, { useContext, useState, useEffect } from 'react';
import './AddParticipantMenu.css';
import { addParticipantsContext } from '../context/participant.context';
import Spinner from './Spinner';

const AddParticipantMenu = ({ availableParticipants, addParticipants }) => {
    const { setShowParticipantsMenu } = useContext(addParticipantsContext);
    const [participantsToAdd, setParticipantsToAdd] = useState([]);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const loadImagePromises = availableParticipants.map(participant =>
            new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = resolve;
                image.onerror = reject;
                image.src = participant.imageUrl;
            })
        );

        Promise.all(loadImagePromises)
            .then(() => setImagesLoaded(true))
            .catch(error => console.error("Error loading images:", error));
    }, [availableParticipants]);

    const handleFadeOut = () => {
        setIsFadingOut(true);
        participantsToAdd.length > 0 && addParticipants(participantsToAdd)
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
            {!imagesLoaded && <Spinner />} {/* Display the spinner until all images are loaded */}

            {imagesLoaded && (
                <>
                    <ul>
                        {availableParticipants.map((participant) => (
                            <li className="li-participant" key={participant._id}>
                                <input onChange={(e) => handleCheckBox(e, participant._id)} type="checkbox" />
                                <img className="avatar" src={participant.imageUrl} alt={`avatar of ${participant.name}`} loading='lazy' />
                                <p>
                                    {participant.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {
                        participantsToAdd.length === 0 ?
                            <button className='close-btn cancel' onClick={() => handleFadeOut()}>➕</button>
                            :
                            <button className='close-btn' onClick={() => handleFadeOut()}>➕</button>
                    }
                </>
            )}
        </div>
    );
};

export default AddParticipantMenu;
