import { useState, useEffect } from 'react';
import AuthService from '../../utils/decode.js';
import { JobContainer } from '../components/JobContainer.jsx';

export const Overview = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const userToken = AuthService.getToken();
        const getURL = "http://localhost:3001/jobs";
        const response = await fetch(getURL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const jobs = await response.json();
        setJobs(jobs);
      } catch (err) {
        console.error(err);
      }
    };
    getJobs();
  }, [jobs]);

  return (
    <div className="flex flex-col gap-5">
      <p>Overview</p>
      <div className="jobsSection flex flex-col w-1/2">
        <h2>Recent Jobs</h2>
        <div className="jobCards flex flex-col gap-2">
          {jobs.map((job) => (
            <JobContainer key={job._id} job={job} />
          ))}
        </div> 
      </div>
    </div>
  );
}