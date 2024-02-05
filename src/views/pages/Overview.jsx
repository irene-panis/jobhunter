import { useState, useEffect } from 'react';
import AuthService from '../../utils/decode.js';
import { JobContainer } from '../components/JobContainer.jsx';
import { StatBox } from '../components/StatBox.jsx';
import { Chart } from '../components/Chart.jsx';

export const Overview = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const userToken = AuthService.getToken();
      try {
        const getURL = "http://localhost:3001/jobs/recent";
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

  const [interview, setInterview] = useState([]);

  useEffect(() => {
    const getInterview = async () => {
      const userToken = AuthService.getToken();
      try {
        const getURL = "http://localhost:3001/jobs/next-interview";
        const response = await fetch(getURL, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
          },
        });
        const interview = await response.json();
        setInterview(interview);
      } catch (err) {
        console.error(err);
      }
    };
    getInterview();
  }, []);

  const [counts, setCounts] = useState({});

  useEffect(() => {
    const getCounts = async () => {
      const userToken = AuthService.getToken();
      try {
        const getURL = "http://localhost:3001/jobs/counts";
        const response = await fetch(getURL, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching job application counts:', error);
      }
    };
    getCounts();
  }, []);

  const heightCalc = {
    minHeight: `calc(100% - 32px)`,
    maxHeight: `calc(100% - 32px)`
  }

  return (
    <div className="h-full">
      <p className="font-bold text-2xl">Applications</p>
      <div className="grid grid-cols-3 grid-rows-6 overflow-hidden" style={heightCalc}>
        <div className="numbersSection flex justify-between col-span-2 row-span-2">
          <StatBox number={counts.open || 0} status={'open'} />
          <StatBox number={counts.interviewing || 0} status={'interviewing'} />
          <StatBox number={counts['no offer'] || 0} status={'no offer'} />
        </div>
        <div className="chartSection col-start-3 col-span-1 row-span-3">
          {
            <Chart/>
          }
        </div>
        <div className="interviewsSection flex flex-col gap-2 col-span-2 row-start-3">
          <h2>Your Next Interview</h2>
          <div className="jobCards flex flex-col gap-2">
            {interview.map((job) => (
              <JobContainer key={job._id} job={job} />
            ))}
          </div> 
        </div>
        <div className="jobsSection flex flex-col gap-2 col-span-2 row-start-4 row-end-7">
          <h2>Recent Jobs</h2>
          <div className="jobCards flex flex-col gap-2">
            {jobs.map((job) => (
              <JobContainer key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}