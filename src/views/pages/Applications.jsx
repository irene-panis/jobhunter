import { useState, useEffect } from 'react';
import AuthService from '../../utils/decode.js';
import { JobContainer } from '../components/JobContainer.jsx';

export const Applications = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const userToken = AuthService.getToken();
        const getURL = "http://localhost:3001/jobs/all";
        const response = await fetch(getURL, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
          },
        });
        const jobs = await response.json();
        setJobs(jobs);
      } catch (err) {
        console.error(err);
      }
    };
    getJobs();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <p>Applications</p>
      <div className="jobsSection flex flex-col w-1/2">
        <div className="flex justify-between items-center px-5 py-3 font-bold">
          <p className="w-1/3">Job Info</p>
          <p className="w-1/3 text-center">Date Applied</p>
          <p className="w-1/3 text-center">Status</p>
        </div>
        <div className="jobCards flex flex-col gap-2">
          {jobs.map((job) => (
            <JobContainer key={job._id} job={job} />
          ))}
        </div> 
      </div>
    </div>
  );
}