import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'

import App from './App.jsx';
import { Overview } from './views/pages/Overview.jsx';
import { Applications } from './views/pages/Applications.jsx';
import { Interviews } from './views/pages/Interviews.jsx';
import { Settings } from './views/pages/Settings.jsx';
import Error from './views/pages/Error.jsx';

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: '/Applications',
        element: <Applications />,
      },
      {
        path: '/Interviews',
        element: <Interviews />,
      },
      {
        path: '/Settings',
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);