import AuthService from '../../utils/decode';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navContainer flex flex-col w-1/5 bg-[#1a1625] py-10 px-20 gap-20 text-2xl lowercase">
      <h1 className="font-bold">JobTracker</h1>
      <ul className="flex flex-col gap-10">
        <li>
          <Link to="/">
            Overview
          </Link>
        </li>
        <li>
          <Link to="/Applications">
            Applications
          </Link>
        </li>
        <li>
          <Link to="/Interviews">
           Interviews
          </Link>
        </li>
        <li>
          <Link to="/Settings">
            Settings
          </Link>
        </li>
      </ul>
      <button 
        type="button" 
        onClick={AuthService.logout}
        className="lowercase text-left"
      >
        Logout
      </button>
    </div>
  );
}