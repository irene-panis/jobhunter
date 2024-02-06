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
        const getURL = "https://jobhunterapp-345c7e7b566e.herokuapp.com/jobs/recent";
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
        const getURL = "https://jobhunterapp-345c7e7b566e.herokuapp.com/jobs/next-interview";
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
        const getURL = "https://jobhunterapp-345c7e7b566e.herokuapp.com/jobs/counts";
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


  const apps = (counts.open + counts.interviewing + counts['no offer']).toString();

  return (
    <div className="h-full flex flex-col gap-2" >
      <p className="font-bold text-2xl">Overview</p>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="numbersSection flex justify-between col-span-2 row-span-1">
          <StatBox number={counts.open || 0} status={'open'} />
          <StatBox number={counts.interviewing || 0} status={'interviewing'} />
          <StatBox number={counts['no offer'] || 0} status={'no offer'} />
          <StatBox number={apps || 0} status={'total'} />
        </div>
        <div className="chartSection col-start-3 col-span-1 row-span-4 bg-dm-black rounded-md p-10 flex flex-col gap-4 shadow-md">
          <p className="font-bold text-2xl">Snapshot</p>
          {
            <Chart counts={counts}/>
          }
        </div>
        <div className="interviewsSection flex flex-col gap-2 col-span-2 row-start-2 gap-2 justify-center">
          <h2 className="font-bold text-xl">Your Next Interview</h2>
          <div className="jobCards flex flex-col gap-2">
            {interview.map((job) => (
              <JobContainer key={job._id} job={job} />
            ))}
          </div> 
        </div>
        <div className="jobsSection flex flex-col col-span-2 row-start-3 row-end-7 gap-2">
          <h2 className="font-bold text-xl">Recent Jobs</h2>
          <div className="jobCards flex flex-col gap-4">
            {jobs.map((job) => (
              <JobContainer key={job._id} job={job} />
            ))}
          </div>
        </div>
        <div className="col-start-3 row-start-5  bg-dm-black rounded-md flex justify-center items-center shadow-md">
          <p>made with 💜 by <a href="https://github.com/irene-panis" className="underline hover:bg-white hover:text-black ease-in-out duration-300">irene panis</a>.</p>
        </div>
      </div>
    </div>
  );
}