import { useState, useEffect } from "react";
import AuthService from '../../utils/decode';

export const ChangePass = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [error, setError] = useState(false);
  const [passMatch, setPassMatch] = useState(true);
  const [passLong, setPassLong] = useState(true);

  // check for matching passwords
  useEffect(() => {
    setPassMatch(newPassword === confirmNewPass);
  }, [newPassword, confirmNewPass]);

  const handlePassChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  }

  const handleNewChange = (event) => {
    setNewPassword(event.target.value);
    setPassLong(true);
  }

  const handleConfirmChange = (event) => {
    setConfirmNewPass(event.target.value);
    setPassLong(true);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = AuthService.getProfile();
      const id = user.data._id;
      const userToken = AuthService.getToken();
      const putURL = `http://localhost:3001/update/${id}`;
      const response = await fetch(putURL, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          current_pass: password,
          new_pass: newPassword
        })
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'invalid_credentials') {
          setError(true);
        } else if (data.error === 'validation_error') {
          setPassLong(false);
        }
        throw new Error(`Error - Status: ${response.status}`);
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="changePassContainer">
      <h2 className="font-bold text-xl">Change Password</h2>
      <form
        id="change-pw"
        className="pw-form flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="password" className="uppercase text-sm">
            Current Password
          </label>
          <br />
          <input
            type="password"
            id="currentPassword"
            name="password"
            className="text-black pl-1"
            onChange={handlePassChange}
            value={password}
            required
          />
        </div>
        {error && <span className="text-red-500 text-sm -mt-1">Invalid password. Please try again.</span>}
        <div>
          <label htmlFor="newPass" className="uppercase text-sm">
            Create New Password
          </label>
          <br />
          <input
            type="password"
            id="newPass"
            name="newPass"
            className="text-black pl-1"
            onChange={handleNewChange}
            value={newPassword}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPass" className="uppercase text-sm">
           Confirm New Password
          </label>
          <br />
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            className="text-black pl-1"
            onChange={handleConfirmChange}
            value={confirmNewPass}
            required
          />
        </div>
        {!passMatch && <span className="text-red-500 text-sm -mt-1">New passwords must match.</span>}
        {!passLong && <span className="text-red-500 text-sm -mt-1">Passwords must be at least 8 characters.</span>}
        <div>
          <button
            type="submit"
            className={`bg-dm-purple ${!passMatch ? '' : 'hover:bg-dm-purple-hov'} ease-in-out duration-300 py-1 px-3 rounded-full ${!passMatch && 'cursor-not-allowed opacity-50 hover:bg-dm-purple'}`}
            disabled={!passMatch}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}