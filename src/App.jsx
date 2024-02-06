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
          <div className="flex w-full min-h-screen bg-dm-grey text-off-white font-montserrat">
            <Navbar/>
            <div className="header-and-content w-full min-h-full flex flex-col text-white">
              <Header/>
              <main className="h-full pl-10 pr-10 flex flex-col">
                <Outlet/>
              </main>  
            </div>   
          </div>
        ) : (
          <div className="flex flex min-h-screen bg-gradient-to-r from-dm-grey to-dm-black text-off-white font-montserrat">
            <Landing/>
          </div>
        )
      }
    </>
  )
}

export default App;
