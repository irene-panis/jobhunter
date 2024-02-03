import { ChangeName } from '../components/ChangeName';

export const Settings = () => {

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-3xl">Settings</h2>
      <div className="settings-container flex flex-col gap-5">
        <ChangeName/>
        <div className="change-email">
          <h2 className="font-bold text-xl">Change Email</h2>
          <form 
            className="pw-form flex flex-col gap-2"
            id="change-email"
          >
            <div>
              <label htmlFor="email" className="uppercase text-sm">Email</label>
              <br />
              <input type="text" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="pw-email" className="uppercase text-sm">Password</label>
              <br />
              <input type="text" id="pw-email" name="email" required />
            </div>
            <div>
              <button className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-1 px-3 rounded-full">Save</button>
            </div>
          </form>
        </div>
        <div className="change-password">
          <h2 className="font-bold text-xl">Change Password</h2>
          <form 
            className="pw-form flex flex-col gap-2"
            id="change-pw"
          >
            <div>
              <label htmlFor="current-pw" className="uppercase text-sm">Current Password</label>
              <br />
              <input type="text" id="current-pw" name="password" required />
            </div>
            <div>
              <label htmlFor="new-pw" className="uppercase text-sm">Create New Password</label>
              <br />
              <input type="text" id="new-pw" name="newPw" required />
            </div>
            <div>
              <label htmlFor="confirm-new-pw" className="uppercase text-sm">Confirm New Password</label>
              <br />
              <input type="text" id="confirm-new-pw" name="confirmNewPw" required />
            </div>
            <div className="save">
              <button className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-1 px-3 rounded-full">Save</button>
            </div>
          </form>
        </div>
        <div className="delete-account">
          <button className="bg-red-600 hover:bg-red-400 ease-in-out duration-300 py-1 px-3 rounded-full">Delete Account</button>
        </div>
      </div>
    </div>
  );
}