import AuthService from '../../utils/decode';

export const ConfirmDelete = ({ onChoice, onConfirmDelete, job }) => {

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
  
      onChoice();
      onConfirmDelete();
    } catch (err) {
      console.error('Failed to delete job', err);
    }
  }

  return (
    <div className="modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="modal bg-white rounded-md p-8 w-1/2 flex flex-col gap-3">
        <div className="modal-content">
          Are you sure you want to delete your application for <span className="font-bold">{job.position}</span> at <span className="font-bold">{job.company}</span>?
        </div>
        <div className="modal-footer flex justify-end gap-2">
          <button
            type="button"
            className="bg-[#fa7a70] hover:bg-[#fc9c95] ease-in-out duration-300 rounded-md text-white py-1 px-3"
            onClick={handleConfirm}
          >
            Delete
          </button>
          <button
            type="button"
            className="bg-[#d1d1d1] hover:bg-[#adacac] ease-in-out duration-300 rounded-md text-black py-1 px-3"
            onClick={onChoice}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}