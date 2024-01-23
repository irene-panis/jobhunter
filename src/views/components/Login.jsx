import { useState } from "react";

export const Login = (props) => {
  const [userData, setUserData] = useState(
    {
      email: '',
      password: ''
    }
  );

  const handleChange = (event) => {
    const data = {...userData};
    data[event.target.name] = event.target.value;
    setUserData(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  } 

  return (
    <div className="formContainer flex flex-col gap-5 w-1/2 justify-center items-center">
      <h2 className="text-3xl w-1/2 font-bold">Login</h2>
      <form id="loginForm" className="flex flex-col gap-5 w-1/2 justify-center" onSubmit={handleSubmit}>
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

        <div className="buttonContainer flex">
          <button
            type="button"
            className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-2 px-3 rounded-md"
          >
            Login
          </button>
        </div>
        <div className="switchFormContainer flex">
          <span>Don't have an account? <button onClick={() => props.onFormSwitch("register")} className="underline decoration-solid hover:bg-off-white hover:text-black ease-in-out duration-300">Register</button></span>
        </div>
      </form>
    </div>
  );
}
