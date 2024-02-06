import AuthService from '../../utils/decode';
import { useState } from 'react';

export const DeleteUser = ({ onClose }) => {
  const user = AuthService.getProfile();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  }

  const handleConfirm = async () => {
    try {
      const id = user.data._id;
      const deleteURL = `https://jobhunterapp-345c7e7b566e.herokuapp.com/delete/${id}`;
      const userToken = AuthService.getToken();
      
      const response = await fetch(deleteURL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password
        })
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === 'invalid_credentials') {
          setError(true);
        }
        throw new Error(`Error - Status: ${response.status}`);
      }
  
      onClose();
      AuthService.logout();
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  }


  return (
    <div className="modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="modal bg-white rounded-md p-8 w-1/2 flex flex-col gap-3">
        <div className="modal-content">
          Are you sure you want to delete your account and all its data, <span className="font-bold">{user.data.first_name}</span>? <span className="font-bold text-red-500">This action cannot be undone.</span>
        </div>
        <form>
          <label htmlFor="password" className="uppercase text-sm">Enter Password</label>
          <br/>
          <input 
            type="password" 
            name="password" 
            className="text-black pl-1 border border-black rounded-md"
            onChange={handleChange}
            value={password}
            required
          />
        </form>
        {error && <span className="text-red-500 font-bold text-sm -mt-2">Incorrect password. Please try again.</span>}
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
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}