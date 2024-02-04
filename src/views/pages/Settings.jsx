import { ChangeName } from '../components/ChangeName';
import { ChangeEmail } from '../components/ChangeEmail';
import { ChangePass } from '../components/ChangePass';

export const Settings = () => {

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-3xl">Settings</h2>
      <div className="settings-container flex flex-col gap-5">
        <ChangeName/>
        <ChangeEmail/>
        <ChangePass/>
        <div className="delete-account">
          <button className="bg-red-600 hover:bg-red-400 ease-in-out duration-300 py-1 px-3 rounded-full">Delete Account</button>
        </div>
      </div>
    </div>
  );
}