import ReactDOM from 'react-dom/client';
import  { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './Index.css'

import App from './App.tsx'

import ErrorPage from './pages/ErrorPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import EventPage from './pages/EventPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import UserPage from './pages/UserPage.tsx';
import EventEditPage from './pages/EventEditPage.tsx';
import EventCreatePage from './pages/EventCreatePage.tsx';
import DeleteConfirmPage from './pages/DeleteConfirmPage.tsx';

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
      },
      {
        path: '/user',
        element: <UserPage/>
      },
      {
        path: '/event-edit/:id',
        element: <EventEditPage/>
      },
      {
        path: '/event-create',
        element: <EventCreatePage/>
      },
      {
        path: '/delete-confirm',
        element: <DeleteConfirmPage/>
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router = {router } />)
}
