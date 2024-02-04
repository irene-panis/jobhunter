import { useState } from 'react';
import AuthService from '../../utils/decode.js';
import { convertToDateTimeObject, convertToCustomFormat } from '../../utils/formatDate.js';

export const EditApp = ({ job, onSubmit, onViewClick }) => {

  const [jobData, setJobData] = useState({
    position: job.position,
    company: job.company,
    location: job.location,
    notes: job.notes,
    status: job.status,
    interview_date: job.interview_date === null ? '' : job.interview_date,
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
      jobData.interview_date = convertToDateTimeObject(jobData.interview_date);
      if (jobData.status !== 'interviewing') {
        jobData.interview_date = null;
        jobData.interview_location = '';
      }
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
      window.location.reload();
    } catch (err) {
      console.log("Job update unsuccessful");
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

        <div className="uppercase text-sm flex gap-3">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="border border-black rounded-md p-1"
          >
            <option value="open">Open</option>
            <option value="interviewing">Interviewing</option>
            <option value="no offer">No Offer</option>
          </select>
        </div>

        {jobData.status === "interviewing" && (
          <div className="uppercase text-sm flex justify-between">
            <div className="flex gap-3 items-center">
              <label htmlFor="interview_date">Interview Date:</label>
              <input
                type="datetime-local"
                name="interview_date"
                value={convertToCustomFormat(jobData.interview_date)}
                onChange={handleChange}
                className="border border-black rounded-md p-1"
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label htmlFor="interview_location">Interview Location:</label>
              <input
                type="text"
                name="interview_location"
                value={jobData.interview_location}
                onChange={handleChange}
                className="border border-black rounded-md p-1"
              />
            </div>
          </div>
        )}

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