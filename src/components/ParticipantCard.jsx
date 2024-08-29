import { useState, useEffect } from "react";
import "./ParticipantCard.css";
import Spinner from "./Spinner";

const ParticipantCard = ({ participant, deleteParticipant, isExtra }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const defaultImage =
    "https://res.cloudinary.com/marcelusironhack/image/upload/v1710765987/neutralPNG_p60p83.png";

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteParticipant(isExtra ? participant.name : participant._id);
    }, 500);
  };

  useEffect(() => {
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = isExtra ? defaultImage : participant.imageUrl;
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
      {!imageLoaded ? (
        <Spinner />
      ) : (
        <img
          className="avatar"
          src={isExtra ? defaultImage : participant.imageUrl}
          onError={(e) => (e.target.src = defaultImage)}
          alt={`avatar of ${participant.name}`}
          loading="lazy"
        />
      )}
      <p>{participant.name}</p>
      <p>
        <span onClick={handleDelete}>❌</span>
      </p>
    </li>
  );
};

export default ParticipantCard;
