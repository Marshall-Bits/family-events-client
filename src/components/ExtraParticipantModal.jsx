import { useState } from "react";
import { eventsService } from "../services/services";
import { useParams } from "react-router-dom";
import "./ExtraParticipantModal.css";

const ExtraParticipantModal = ({ setShowModal, getEvent, handleFadeOut }) => {
  const [participant, setParticipant] = useState("");
  const { eventId } = useParams();

  const handleAddParticipant = (participant) => {
    eventsService
      .addExtraParticipant(eventId, {
        name: participant,
      })
      .then(() => {
        getEvent();
        handleFadeOut();
        setShowModal(false);
      });
  };

  return (
    <div onClick={() => setShowModal(false)} className="layout">
      <div className="modal">
        <input type="text" required onChange={(e) => setParticipant(e.target.value)} />
        <button className="yes-btn" onClick={() => handleAddParticipant(participant)}>
          Afegir
        </button>
        <button className="no-btn" onClick={() => setShowModal(false)}>Cancel·lar</button>
      </div>
    </div>
  );
};

export default ExtraParticipantModal;
