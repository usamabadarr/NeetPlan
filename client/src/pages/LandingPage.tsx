import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HomePage from './HomePage.tsx';
import auth from '../utils/auth.ts';


const LandingPage = () => {
  
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
    <>
    {
      !loginCheck ? (
        <div className = 'login-notice'>
          <h2><Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link> to continue</h2>
        </div>
      ) : (
        <HomePage/>
      )
    }
    </>
  )
}

export default LandingPage;