import { useState, useEffect } from "react";
import AuthService from '../../utils/decode';

export const Register = (props) => {

  // STATES //
  // keep track of form data
  const [userData, setUserData] = useState(
    {
      first_name: '',
      email: '',
      password: '',
      confirm_pass: ''
    }
  );
  // continously check if pass and confirmpass are matching
  const [passMatch, setPassMatch] = useState(true);
  // for when inputs are invalid/empty, helps w/ styling and form disable
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  // display error when dupe email is found in database
  const [isEmailFound, setIsEmailFound] = useState(false);
  // display error when submitted pw is not long enough (<8 chars)
  const [isLongPass, setIsLongPass] = useState(true);

  // check for matching passwords
  useEffect(() => {
    setPassMatch(userData.password === userData.confirm_pass);
  }, [userData.password, userData.confirm_pass]);

  // check for invalid/empty inputs
  useEffect(() => {
    setIsFormDisabled(
      !passMatch || 
      !userData.first_name ||
      !userData.email ||
      !userData.password
    );
  }, [userData, passMatch]);

  const handleChange = (event) => {
    const data = {...userData};
    data[event.target.name] = event.target.value;
    setUserData(data);
    // clear dupe email error when user modifies email input
    if (event.target.name === 'email') {
      setIsEmailFound(false);
    }
    if (event.target.name === 'password') {
      setIsLongPass(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postURL = 'http://localhost:3001/register';
      const response = await fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            first_name: userData.first_name,
            email: userData.email,
            password: userData.password
          }
        ),
      })

      const data = await response.json();
      // error handling
      if (!response.ok) {
        if (data.error === "duplicate_email") {
          console.log("dupe email found");
          setIsEmailFound(true);
        } else {
          setIsEmailFound(false);
        }
        if (data.error === 'validation_error') {
          console.log("password must be at least 8 characters");
          setIsLongPass(false);
        } else {
          setIsLongPass(true);
        }
        throw new Error(`Error - Status: ${response.status}`);
      }

      AuthService.login(data.accessToken);
      console.log("User creation successful");
    } catch (err) {
      console.log("User creation unsuccessful");
      console.log(err);
    }
  } 

  return (
    <div className="formContainer flex flex-col gap-5 w-1/2 justify-center items-center">
      <h2 className="text-3xl w-1/2 font-bold">Register</h2>
      <form id="registrationForm" className="flex flex-col gap-5 w-1/2 justify-center" onSubmit={handleSubmit}>
        <div className="inputContainer flex gap-10">
          <div className="nameContainer flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="firstName">
              First Name
            </label>
            <input
              className="rounded-md text-black pl-2"
              type="text"
              name="first_name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            {isEmailFound && <span className="text-red-500 text-sm">Email already registered.</span>}
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
          <div className="confirmContainer flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="rounded-md text-black pl-2"
              type="password"
              id="confirm_pass"
              name="confirm_pass"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {!passMatch && <span className="text-red-500 text-sm -mt-4">Passwords do not match</span>}
        {!isLongPass && <span className="text-red-500 text-sm -mt-4">Password must be at least 8 characters.</span>}

        <div className="buttonContainer flex">
          <button
            type="submit"
            className={`bg-dm-purple ${isFormDisabled ? '' : 'hover:bg-dm-purple-hov'} ease-in-out duration-300 py-2 px-3 rounded-md ${isFormDisabled && 'cursor-not-allowed opacity-50 hover:bg-dm-purple'}`}
            disabled={isFormDisabled}
          >
            Register
          </button>
        </div>
        <div className="buttonContainer flex">
          <span>Already have an account? <button onClick={() => props.onFormSwitch('login')} className="underline decoration-solid hover:bg-off-white hover:text-black ease-in-out duration-300">Sign in</button></span>
        </div>
      </form>
    </div>
  );
}
