import { useState } from "react";
import AuthService from '../../utils/decode';

export const ChangeName = () => {
  const user = AuthService.getProfile();
  const [displayName, setDisplayName] = useState(user.data.first_name);

  const handleChange = (event) => {
    setDisplayName(event.target.value);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = AuthService.getProfile();
      const id = user.data._id;
      const userToken = AuthService.getToken();
      const putURL = `http://localhost:3001/update/${id}`;
      const response = await fetch(putURL, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          first_name: displayName
        })
      });
      const data = await response.json();
      AuthService.updateToken(data.accessToken);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="changeNameContainer">
      <h2 className="font-bold text-xl">Change Display Name</h2>
      <form
        id="change-name"
        className="pw-form flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="firstName" className="uppercase text-sm">
            Name
          </label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="text-black pl-1"
            onChange={handleChange}
            value={displayName}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-dm-purple hover:bg-dm-purple-hov ease-in-out duration-300 py-1 px-3 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}