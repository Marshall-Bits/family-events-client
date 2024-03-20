import { useState, useEffect } from 'react';
import './ParticipantCard.css';
import Spinner from './Spinner';

const ParticipantCard = ({ participant, deleteParticipant }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            deleteParticipant(participant._id);
        }, 500);
    };

    useEffect(() => {
        const loadImage = () => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve();
                image.onerror = () => reject();
                image.src = participant.imageUrl;
            });
        };

        loadImage()
            .then(() => {
                setImageLoaded(true);
            })
            .catch(() => {
                console.error("Error loading image");
            });
    }, [participant.imageUrl]);

    return (
        <li className={`participants-card-container ${isDeleting && "deleting"}`}>
            {!imageLoaded
                ?
                <Spinner />
                :
                <img className="avatar" src={participant.imageUrl} alt={`avatar of ${participant.name}`} loading='lazy' />
            }
            <p>
                {participant.name}
            </p>
            <p>
                <span onClick={handleDelete}>❌</span>
            </p>
        </li>
    );
};

export default ParticipantCard;