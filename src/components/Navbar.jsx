import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav >
            <menu id="navbar-menu">
                <li>
                    <Link to="/">📃</Link>
                </li>
                <li>
                    <Link to="/new-event">➕</Link>
                </li>
                <li>
                    <Link to="/members">👨‍👩‍👧‍👦</Link>
                </li>
            </menu>
        </nav>
    );
};

export default Navbar;