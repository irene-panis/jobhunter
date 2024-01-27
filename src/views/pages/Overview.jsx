export const Overview = () => {
  return (
    <div className="flex flex-col">
      <p>Overview</p>
      <form className="flex flex-col gap-5 bg-white text-black rounded-md py-5 px-10 w-1/4">
        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="position">Position</label>
          <input className="border border-black rounded-md p-1" type="text" id="position" name="position" required/>
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="company">Company</label>
          <input className="border border-black rounded-md p-1" type="text" id="company" name="company" required/>
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="location">Location</label>
          <input className="border border-black rounded-md p-1" type="text" id="location" name="location" required/>
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="notes">Notes</label>
          <textarea className="border border-black rounded-md p-1" id="notes" name="notes"></textarea>
        </div>

        <button type="submit" className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md text-off-white py-1">Create Job</button>
      </form>
    </div>
  );
}