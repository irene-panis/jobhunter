import AuthService from '../../utils/decode.js';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navContainer flex flex-col bg-dm-black py-10 px-20 gap-20 text-2xl lowercase">
      <h1 className="font-bold">
        <Link to="/" className="flex gap-2">
          <img className="w-9 h-9" src="/jobhunter-logo.png"/>
          <span>Jobhunter</span>
        </Link>
      </h1>
      <ul className="flex flex-col gap-10">
        <li>
          <Link to="/" className="hover:bg-white hover:text-black ease-in-out duration-300">
            Overview
          </Link>
        </li>
        <li>
          <Link to="/Applications" className="hover:bg-white hover:text-black ease-in-out duration-300">
            Applications
          </Link>
        </li>
        <li>
          <Link to="/Interviews" className="hover:bg-white hover:text-black ease-in-out duration-300">
           Interviews
          </Link>
        </li>
        <li>
          <Link to="/Settings" className="hover:bg-white hover:text-black ease-in-out duration-300">
            Settings
          </Link>
        </li>
      </ul>
      <button 
        type="button" 
        onClick={AuthService.logout}
        className="lowercase text-left hover:bg-white hover:text-black ease-in-out duration-300"
      >
        Logout
      </button>
    </div>
  );
}