import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = 'nav'>
            <h1>Daily Planner</h1>;
            <ul>
                <li className = 'nav-item'>
                    <button>
                        <Link to = '/'>Home</Link>
                    </button>
                </li>

                <li className = 'nav-item'>
                    <button>
                        <Link to = '/event'>Events</Link>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;