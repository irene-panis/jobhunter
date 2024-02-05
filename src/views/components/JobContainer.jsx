import { formatDate } from "../../utils/formatDate";
import { useState } from 'react';
import { Modal } from "./Modal.jsx";
import { ViewApp } from "./ViewApp.jsx";
import { EditApp } from "./EditApp.jsx";

export const JobContainer = ({ job }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(false);
    setEditing(false);
  }

  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleViewClick = () => {
    setEditing(false);
  }

  return (
    <div>
      <div
        className={`flex justify-between items-center bg-dm-black shadow-md text-white rounded-md px-5 py-3 cursor-pointer ${(() => {
          switch (job.status) {
            case "interviewing":
              return "border-l-8 border-l-[#5fff27]";
            case "no offer":
              return "border-l-8 border-l-[#ff6384]";
            default:
              return "border-l-8 border-l-[#ffce56]"; // No border
          }
        })()}`}
        onClick={() => setModalOpen(true)}
      >
        <div className="job-info flex flex-col w-1/3">
          <p className="font-bold">{job.position}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.notes}</p>
        </div>
        <div className="date-applied w-1/3 text-center">
          <p>{formatDate(job.date_applied)}</p>
        </div>
        <div className="job-status w-1/3 text-center">
          <p>{job.status}</p>
        </div>
      </div>
      {modalOpen && (
        <Modal onClose={handleButtonClick} job={job} key={job._id}>
          {editing ? (
            <EditApp
              job={job}
              onViewClick={handleViewClick}
              onSubmit={handleButtonClick}
            />
          ) : (
            <ViewApp
              job={job}
              onEditClick={handleEditClick}
              onConfirmDelete={handleButtonClick}
            />
          )}
        </Modal>
      )}
    </div>
  );
}