
function Landing() {
  return (
    <div className="flex justify-evenly w-full self-center">
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl">Register</h2>
      <form id="registrationForm" className="flex flex-col gap-5">
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="firstName">First Name</label>
            <input className="rounded-md text-black pl-2" type="text" id="firstName" name="firstName" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="email">Email</label>
            <input className="rounded-md text-black pl-2" type="email" id="email" name="email" required />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="password">Password</label>
            <input className="rounded-md text-black pl-2" type="password" id="password" name="password" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="rounded-md text-black pl-2"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick="register()" className="bg-[#415A77] hover:bg-[#778DA9] ease-in-out duration-300 py-2 px-3 rounded-md">
            Register
          </button>
        </div>
      </form>
    </div>
    <div className="">
      <h2 className="text-4xl">Your job hunt just got a whole lot easier.</h2>
      <h3 className="text-xl">Register now to start tracking your applications.</h3>
    </div>
    </div>
  );
}

export default Landing;