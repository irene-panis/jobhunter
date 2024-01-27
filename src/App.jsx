import './App.css'
import { Outlet } from 'react-router-dom';
import Landing from './views/pages/Landing.jsx';
import { Navbar } from './views/components/Navbar.jsx';
import AuthService from './utils/decode.js';

function App() {
  return (
    <>
      {
        AuthService.loggedIn() ? (
          <div className="flex flex min-h-screen bg-dark-mode text-off-white font-montserrat">
            <Navbar/>
            <main className="w-full">
              <Outlet/>
            </main>     
          </div>
        ) : (
          <div className="flex flex min-h-screen bg-dark-mode text-off-white font-montserrat">
            <Landing/>
          </div>
        )
      }
    </>
  )
}

export default App;
