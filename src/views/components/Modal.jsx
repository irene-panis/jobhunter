export const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="modal bg-white rounded-md p-8 w-1/2">
        <div className="modal-header flex justify-end">
          <p className="close text-4xl font-bold hover:text-stone-400 ease-in-out duration-200 cursor-pointer" onClick={() => onClose()}>&times;</p>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}