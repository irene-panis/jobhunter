import { Modal } from "./Modal.jsx";
import { useState } from "react";
import { NewApp } from './NewApp.jsx';
import AuthService from '../../utils/decode.js';

export const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(false);
  }

  const user = AuthService.getProfile();
  const name = user.data.first_name;

  return (
    <div className="h-[12rem] bg-dark-mode flex items-center">
      <div className="text w-3/4 pl-10">
        <h2 className="text-4xl">Hi there, {name}.</h2>
        <p>This is a motivational quote.</p>
      </div>
      <div className="logContainer">
        <button 
        type="button"
        className="uppercase bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 rounded-md py-1 px-2"
        onClick={() => setModalOpen(true)}
        >
          + New Application
        </button>
      </div>
      {modalOpen && (
        <Modal
          onClose={handleButtonClick}
        >
          <NewApp
            onSubmit={handleButtonClick}
          />
        </Modal>
      )}
    </div>
  );
}