import './App.css'
import Landing from './views/pages/Landing';
import { Navbar } from './views/components/Navbar';
import AuthService from './utils/decode';

function App() {
  return (
    <>
      <main className="flex min-h-screen bg-dark-mode text-off-white font-montserrat">
        {
          AuthService.loggedIn() ?
          <Navbar/> :
          <Landing/>
        }
      </main>
    </>
  )
}

export default App
