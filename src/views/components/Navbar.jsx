import AuthService from '../../utils/decode';

export const Navbar = () => {
  return (
    <div className="navContainer flex flex-col w-1/5 bg-[#1a1625] py-10 px-20 gap-20 text-2xl lowercase">
      <h1 className="font-bold">JobTracker</h1>
      <ul className="flex flex-col gap-10">
        <li>Overview</li>
        <li>Applications</li>
        <li>Interviews</li>
        <li>Settings</li>
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