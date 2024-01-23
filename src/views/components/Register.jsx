import { useState } from "react";

export const Register = (props) => {
  const [userData, setUserData] = useState(
    {
      first_name: '',
      email: '',
      password: ''
    }
  );

  const handleChange = (event) => {
    const data = {...userData};
    data[event.target.name] = event.target.value;
    setUserData(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postURL = 'http://localhost:3001/register';
      fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then(() => {
        console.log("User creation successful");
      });
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
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
        </div>

        <div className="buttonContainer flex">
          <button
            type="submit"
            className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-2 px-3 rounded-md"
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
