export const ConfirmDelete = ({ onChoice, children, onConfirm }) => {

  return (
    <div className="modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="modal bg-dm-grey text-white rounded-md p-8 w-1/2 flex flex-col gap-3">
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer flex justify-end gap-2">
          <button
            type="button"
            className="bg-[#fa7a70] hover:bg-[#fc9c95] ease-in-out duration-300 rounded-md text-white py-1 px-3"
            onClick={onConfirm}
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