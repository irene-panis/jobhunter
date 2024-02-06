import { useState } from 'react';
import AuthService from '../../utils/decode.js';

export const NewApp = ({ onSubmit }) => {

  const [jobData, setJobData] = useState({
    position: '',
    company: '',
    location: '',
    notes: '',
    status: 'open',
    interview_date: null,
    interview_location: ''
  });

  const handleChange = (event) => {
    const data = {...jobData};
    data[event.target.name] = event.target.value;
    setJobData(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postURL = 'https://jobhunterapp-345c7e7b566e.herokuapp.com/jobs';
      const userToken = AuthService.getToken();
      await fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(jobData)
      });
      onSubmit();
      if (window.location.pathname === "/Applications" ||
      window.location.pathname === "") {
        window.location.reload();
      }
    } catch (err) {
      console.log("Job creation unsuccessful");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Submit New Application</h2>
      <form
        className="flex flex-col gap-5 bg-dm-grey text-white rounded-md py-5 px-10 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="position">Position</label>
          <input
            className="border border-black rounded-md p-1 text-black"
            type="text"
            name="position"
            value={jobData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="company">Company</label>
          <input
            className="border border-black rounded-md p-1 text-black"
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="location">Location</label>
          <input
            className="border border-black rounded-md p-1 text-black"
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="border border-black rounded-md p-1 text-black"
            name="notes"
            value={jobData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md text-off-white py-1"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}