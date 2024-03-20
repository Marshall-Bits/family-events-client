import React, { useState, useEffect } from "react";
import './ProfileCard.css';
import Spinner from './Spinner';

const ProfileCard = ({ user }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const loadImage = () => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve();
                image.onerror = () => reject();
                image.src = user.imageUrl;
            });
        };

        loadImage()
            .then(() => {
                setImageLoaded(true);
            })
            .catch(() => {
                console.error("Error loading image");
            });
    }, [user.imageUrl]);

    return (
        <article className='user-card'>
            {!imageLoaded && <Spinner />} 
            <img
                loading='lazy'
                className="user-img"
                src={user.imageUrl}
                alt={`picture of ${user.name}`}
                style={{ display: imageLoaded ? 'block' : 'none' }} 
            />
            <h2>{user.name}</h2>
        </article>
    );
};

export default ProfileCard;
