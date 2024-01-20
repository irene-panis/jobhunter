import { useState } from "react";
import { Register } from '../components/Register';
import { Login } from '../components/Login';

function Landing() {

  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="flex justify-evenly w-full self-center">
      { 
        currentForm === 'register' ? 
        <Register onFormSwitch={toggleForm}/> : 
        <Login onFormSwitch={toggleForm}/>
      }
      <div className="heroContainer">
        <h2 className="text-4xl">Your job hunt just got a whole lot easier.</h2>
        <h3 className="text-xl">
          Register now to start tracking your applications.
        </h3>
      </div>
    </div>
  );
}

export default Landing;