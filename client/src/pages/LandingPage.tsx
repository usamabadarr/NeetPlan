import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import { TicketData } from '../interfaces/TicketData.tsx';
import { ApiMessage } from '../interfaces/ApiMessage.tsx';

const LandingPage = () => {
  const [tickets, setTickets] useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  
  const checkLogin = () => {
    i
  }
  return (
    <>
      <h1>Daily Planner</h1>
    </>
  )
}

export default LandingPage;