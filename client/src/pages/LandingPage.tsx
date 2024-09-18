import {useLayoutEffect, useState } from 'react';

import ErrorPage from './ErrorPage';
import auth from '../utils/auth.ts';

const LandingPage = () => {
  const [error /*, setError*/] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  if (error) {
    return <ErrorPage />;
  }


  return (
    <>
    {
      !loginCheck ? (
        <div className = 'login-notice'>
          <h1>Daily Planner</h1>
        </div>
      ) : (
        <div>
          <h1>Congrats! You're logged in</h1>
        </div>
      )
    }
      <h1>Daily Planner</h1>
    </>
  )
}

export default LandingPage;