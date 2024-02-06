import { useState } from "react";
import AuthService from '../../utils/decode';

export const ChangeEmail = () => {
  const user = AuthService.getProfile();
  const [email, setEmail] = useState(user.data.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [dupeEmail, setDupeEmail] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setDupeEmail(false);
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = AuthService.getProfile();
      const id = user.data._id;
      const userToken = AuthService.getToken();
      const putURL = `https://jobhunterapp-345c7e7b566e.herokuapp.com/update/${id}`;
      const response = await fetch(putURL, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'dupe_email') {
          setDupeEmail(true);
        } else if (data.error === 'invalid_credentials') {
          setError(true);
        }
        throw new Error(`Error - Status: ${response.status}`);
      }
      AuthService.updateToken(data.accessToken);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="changeEmailContainer">
      <h2 className="font-bold text-xl">Change Email</h2>
      <form
        id="change-email"
        className="pw-form flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="uppercase text-sm">
            Email
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            className="text-black pl-1"
            onChange={handleEmailChange}
            value={email}
            required
          />
        </div>
        {dupeEmail && <span className="text-red-500 text-sm -mt-1">Email is already in use.</span>}
        <div>
          <label htmlFor="password" className="uppercase text-sm">
            Enter Password
          </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            className="text-black pl-1"
            onChange={handlePassChange}
            value={password}
            required
          />
        </div>
        {error && <span className="text-red-500 text-sm -mt-1">Invalid credentials. Please try again.</span>}
        <div>
          <button
            type="submit"
            className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-1 px-3 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}