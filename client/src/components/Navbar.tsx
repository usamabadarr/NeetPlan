import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className = 'nav'>
            <h1>Daily Planner</h1>;
            <ul>
                <li className = 'nav-item'>
                    <button>
                        <Link to = ''>Login</Link>
                    </button>
                </li>

                <li className = 'nav-item'>
                    <button>
                        <Link to = ''>About</Link>
                    </button>
                </li>

                <li className = 'nav-item'>
                    <button>
                        <Link to = ''>Contact</Link>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;