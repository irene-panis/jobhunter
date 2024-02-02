import { formatDate, formatInterviewTime } from "../../utils/formatDate";

export const ViewApp = ({ job, onEditClick }) => {
  return (
    <div className="flex flex-col gap-3 justify-between bg-white text-black rounded-md px-5 py-3">
      <div className="job-info flex flex-col">
        <p className="font-bold text-2xl">{ job.position }</p>
        <p><span className="font-bold">Company: </span>{ job.company }</p>
        <p><span className="font-bold">Location: </span>{ job.location }</p>
        <p><span className="font-bold">Notes: </span>
          { (job.notes === '') ?
            'N/A' :
            job.notes 
          }</p>
      </div>
      <div className="date-applied">
        <p><span className="font-bold">Date applied: </span>{ formatDate(job.date_applied) }</p>
      </div>
      <div className="job-status">
        <p><span className="font-bold">Status: </span>{ job.status }</p>
      </div>
      { (job.status === 'interviewing') &&
        (
          <div className="interview-info">
            <p><span className="font-bold">Interview date: </span> { formatInterviewTime(job.interview_date) }</p>
            <p><span className="font-bold">Interview location: </span> { job.interview_location }</p>
          </div>
        )
      }
      <div className="edit-button flex justify-end">
        <button 
          type="button" 
          className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md text-off-white py-1 px-3"
          onClick={onEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
}