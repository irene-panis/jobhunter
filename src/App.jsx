import './App.css'
import { Outlet } from 'react-router-dom';
import Landing from './views/pages/Landing.jsx';
import { Navbar } from './views/components/Navbar.jsx';
import { Header } from './views/components/Header.jsx';
import AuthService from './utils/decode.js';

function App() {
  return (
    <>
      {
        AuthService.loggedIn() ? (
          <div className="flex w-full min-h-screen bg-dark-mode text-off-white font-montserrat">
            <Navbar/>
            <div className="header-and-content w-full flex flex-col text-white">
              <Header/>
              <main className="w-full pl-10">
                <Outlet/>
              </main>  
            </div>   
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
