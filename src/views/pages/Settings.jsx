import { ChangeName } from '../components/ChangeName';
import { ChangeEmail } from '../components/ChangeEmail';
import { ChangePass } from '../components/ChangePass';
import { DeleteUser } from '../components/DeleteUser';
import { useState } from 'react';

export const Settings = () => {

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmModal(true);
  }

  const handleCloseConfirm = async () => {
    setShowConfirmModal(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-3xl">Settings</h2>
      <div className="settings-container flex flex-col gap-5">
        <ChangeName/>
        <ChangeEmail/>
        <ChangePass/>
        <div className="delete-account">
          <button 
            type="button"
            className="bg-red-600 hover:bg-red-400 ease-in-out duration-300 py-1 px-3 rounded-full"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
      { showConfirmModal && (
        <DeleteUser
          onClose={handleCloseConfirm}
        />
      )}
    </div>
  );
}