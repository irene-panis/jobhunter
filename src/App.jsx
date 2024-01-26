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
          <div>
            <Navbar/>
            <main className="flex min-h-screen bg-dark-mode text-off-white font-montserrat">
              <Outlet/>
            </main>     
          </div>
        ) : (
          <Landing/>
        )
      }
    </>
  )
}

export default App;
