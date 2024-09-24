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
        <header>
                <h1>NeetPlan</h1>
                <nav className = 'nav'>
                    {loginCheck? (
                        <ul>
                                <Link to = '/'><li className = 'nav-item'>Home</li></Link>
                                <Link to = '/calendar'><li className = 'nav-item'>Calendar</li></Link>
                                <Link to = '/event-create'><li className = 'nav-item'>Create New Event</li></Link> 
                                <Link to = '/all'><li className = 'nav-item'>View All Events</li></Link>
                                <Link to = '/user'><li className = 'nav-item'>User Settings</li></Link>      
                                <Link to='' onClick={auth.logout}><li className = 'nav-item'>Logout</li></Link>
                                <Link to = '/about'><li className = 'nav-item'>About</li></Link>  

                        </ul>
                    ) : (
                    <>
                        <ul>
                                <Link to = '/'><li className = 'nav-item'>Home</li></Link>
                                <Link to = '/about'><li className = 'nav-item'>About</li></Link>  
                                <Link to='/login'><li className = 'nav-item'>Login</li></Link>
                                <Link to = '/signup'><li className = 'nav-item'>Sign Up</li></Link>
                        </ul>
                    </>)}
                </nav>
        </header>
    )
}

export default Navbar;