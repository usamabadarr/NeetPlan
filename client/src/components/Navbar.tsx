import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import auth from '../utils/auth';

const Navbar = () => {

    const [loginCheck, setLoginCheck] = useState(false);
  
    const checkLogin = () => {
      if (auth.loggedIn()) {
        setLoginCheck(true);
      }
    };
  
    useEffect(() => {
      checkLogin();
    }, []);

    return (
        <nav className = 'nav'>
            <h1>Daily Planner</h1>
            {loginCheck? (
                <ul>
                    <li className = 'nav-item'>
                            <Link to = '/'>Home</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/calendar'>Calendar</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/event-create'>Create New Event</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/all'>View All Events</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/user'>User Settings</Link>
                    </li>
                    
                    <li className = 'nav-item'>
                            <Link to='' onClick={auth.logout}>Logout</Link>
                    </li>
                </ul>
            ) : (
            <>
                <ul>
                    <li className = 'nav-item'>
                            <Link to = '/'>Home</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/about'>About</Link>
                    </li>
                    
                    <li className = 'nav-item'>
                            <Link to='/login'>Login</Link>
                    </li>

                    <li className = 'nav-item'>
                            <Link to = '/signup'>Sign Up</Link>
                    </li>
                </ul>
            </>)}
        </nav>
    )
}

export default Navbar;