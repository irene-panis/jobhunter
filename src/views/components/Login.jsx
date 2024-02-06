import { useState } from "react";
import AuthService from '../../utils/decode.js';

export const Login = (props) => {
  const [userData, setUserData] = useState(
    {
      email: '',
      password: ''
    }
  );

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const data = {...userData};
    data[event.target.name] = event.target.value;
    setUserData(data);

    // clear error when user modifies input
    setError(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postURL = 'https://jobhunterapp-345c7e7b566e.herokuapp.com/login';
      const response = await fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      // error handling
      if (!response.ok) {
        if (data.error === 'invalid_credentials') {
          setError(true);
        }
        throw new Error(`Error - Status: ${response.status}`);
      }

      AuthService.login(data.accessToken);
    } catch (err) {
      console.log("User login unsuccessful");
      console.error(err);
    }
  } 

  return (
    <div className="formContainer flex w-1/2 justify-center items-center">
      <div className="bg-dm-black flex flex-col gap-5 py-10 px-20 rounded-md shadow-md">
        <h2 className="text-3xl font-bold">Login</h2>
        <form id="loginForm" className="flex flex-col gap-5 justify-center" onSubmit={handleSubmit}>
          <div className="inputContainer flex gap-10">
            <div className="emailContainer flex flex-col gap-1">
              <label className="text-xs uppercase" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md text-black pl-2"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="inputContainer flex gap-10">
            <div className="passwordContainer flex flex-col gap-1">
              <label className="text-xs uppercase" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md text-black pl-2"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <span className="text-red-500 text-sm -mt-4">Invalid credentials. Please try again.</span>}

          <div className="buttonContainer flex">
            <button
              type="submit"
              className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-2 px-3 rounded-md"
            >
              Login
            </button>
          </div>
          <div className="switchFormContainer flex">
            <span>Don't have an account? <button type="button" onClick={() => props.onFormSwitch("register")} className="underline decoration-solid hover:bg-off-white hover:text-black ease-in-out duration-300">Register</button></span>
          </div>
        </form>
      </div>
    </div>
  );
}
