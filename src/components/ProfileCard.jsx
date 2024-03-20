import './ProfileCard.css';

const ProfileCard = ({ user }) => {
    return (
        <article className='user-card'>
            <img className="user-img" src={user.imageUrl} alt={`picture of ${user.name}`} />
            <h2>{user.name}</h2>
        </article>
    );
};

export default ProfileCard;