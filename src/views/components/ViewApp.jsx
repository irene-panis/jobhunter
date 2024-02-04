import { formatDate, formatInterviewTime } from "../../utils/formatDate";
import { useState } from 'react';
import { ConfirmDelete } from "./ConfirmDelete.jsx";
import AuthService from '../../utils/decode';

export const ViewApp = ({ job, onEditClick, onConfirmDelete }) => {

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmModal(true);
  }

  const handleCloseConfirm = async () => {
    setShowConfirmModal(false);
  }

  const handleConfirm = async () => {
    try {
      const jobId = job._id; 
      const deleteURL = `http://localhost:3001/jobs/${jobId}`;
      const userToken = AuthService.getToken();
      
      await fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      });
  
      handleCloseConfirm();
      onConfirmDelete();
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete job', err);
    }
  }

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
      <div className="edit-button flex justify-end gap-2">
        <button 
          type="button" 
          className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md text-off-white py-1 px-3"
          onClick={onEditClick}
        >
          Edit
        </button>
        <button 
          type="button" 
          className="bg-[#fa7a70] hover:bg-[#fc9c95] ease-in-out duration-300 rounded-md text-white py-1 px-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {
        showConfirmModal && (
          <ConfirmDelete 
            onChoice={handleCloseConfirm}
            onConfirm={handleConfirm}
          >
            Are you sure you want to delete your application for  
            <span className="font-bold">{job.position}</span> at <span className="font-bold">{job.company}</span>?
          </ConfirmDelete>
        )
      }
    </div>
  );
}