import ReactDOM from 'react-dom/client';
import  { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import App from './app(1).tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import EventPage from './pages/EventPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/event',
        element: <EventPage/>
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/signup',
        element: <SignupPage/>
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router = {router } />)
}
