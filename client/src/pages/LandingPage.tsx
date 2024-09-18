import {useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane.tsx';
import { TicketData } from '../interfaces/TicketData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';
import auth from '../utils/auth.ts';

const LandingPage = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
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