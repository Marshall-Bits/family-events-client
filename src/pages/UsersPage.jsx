import { useEffect, useState } from "react";
import { userService } from "../services/services";
import './UsersPage.css';
import ProfileCard from "../components/ProfileCard";

const UsersPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll()
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section className="general-page-container users">
            {
                users.map((user) => <ProfileCard key={user._id} user={user} />)
            }
        </section>
    );
};

export default UsersPage;