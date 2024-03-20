import { useEffect, useState, useContext } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { addParticipantsContext } from '../context/participant.context';

const Navbar = () => {
    const [isEventPage, setIsEventPage] = useState(false);
    const location = useLocation();
    const { setShowParticipantsMenu } = useContext(addParticipantsContext);

    useEffect(() => {
        setIsEventPage(location.pathname.includes('events/'));
    }, [location]);

    return (
        <nav >
            <menu id="navbar-menu">
                <li>
                    <Link to="/">📃</Link>
                </li>
                {isEventPage ?
                    <li>
                        <p onClick={() => setShowParticipantsMenu(true)}>➕</p>
                    </li>
                    :
                    <li>
                        <Link to="/new-event">➕</Link>
                    </li>
                }

                <li>
                    <Link to="/users">👨‍👩‍👧‍👦</Link>
                </li>
            </menu>
        </nav>
    );
};

export default Navbar;