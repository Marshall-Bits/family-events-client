import { useState } from 'react';
import './ParticipantCard.css';


const ParticipantCard = ({ participant, deleteParticipant }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            deleteParticipant(participant._id);
        }, 500);
        // deleteParticipant(participant._id);
    };

    return (
        <li className={`participants-card-container ${isDeleting && "deleting"}`}>
            <img className="avatar" src={participant.imageUrl} alt="" />
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