import { useState } from 'react';
import AuthService from '../../utils/decode.js';

export const EditApp = ({ job, onSubmit, onViewClick }) => {

  const [jobData, setJobData] = useState({
    position: job.position,
    company: job.company,
    location: job.location,
    notes: job.notes,
    status: job.status,
    interview_date: job.interview_date,
    interview_location: job.interview_location
  });

  const handleChange = (event) => {
    const data = {...jobData};
    data[event.target.name] = event.target.value;
    setJobData(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jobId = job._id;
      const postURL = `http://localhost:3001/jobs/${jobId}`;
      const userToken = AuthService.getToken();
      await fetch(postURL, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(jobData)
      });
      onSubmit();
    } catch (err) {
      console.log("Job creation unsuccessful");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Edit Application</h2>
      <form
        className="flex flex-col gap-5 bg-white text-black rounded-md py-5 px-10 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col uppercase text-sm">
          <label htmlFor="position">Position</label>
          <input
            className="border border-black rounded-md p-1"
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
            className="border border-black rounded-md p-1"
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
            className="border border-black rounded-md p-1"
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
            className="border border-black rounded-md p-1"
            name="notes"
            value={jobData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md text-off-white py-1"
        >
          Update Application
        </button>
        <button
          type="button"
          className="bg-[#d1d1d1] hover:bg-[#adacac] ease-in-out duration-300 rounded-md text-black py-1"
          onClick={onViewClick}
        >
          View Application
        </button>
      </form>
    </div>
  );
}