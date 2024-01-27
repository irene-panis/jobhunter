import './App.css'
import { Outlet } from 'react-router-dom';
import Landing from './views/pages/Landing';
import { Navbar } from './views/components/Navbar';
import AuthService from './utils/decode';

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
