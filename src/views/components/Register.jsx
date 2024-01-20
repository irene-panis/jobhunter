export const Register = (props) => {
  return (
    <div className="formContainer flex flex-col gap-5">
      <h2 className="text-3xl">Register</h2>
      <form id="registrationForm" className="flex flex-col gap-5">
        <div className="inputContainer flex gap-10">
          <div className="nameContainer flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="firstName">
              First Name
            </label>
            <input
              className="rounded-md text-black pl-2"
              type="text"
              id="firstName"
              name="firstName"
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
              id="email"
              name="email"
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
              id="password"
              name="password"
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
            type="button"
            className="bg-[#415A77] hover:bg-[#778DA9] ease-in-out duration-300 py-2 px-3 rounded-md"
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
