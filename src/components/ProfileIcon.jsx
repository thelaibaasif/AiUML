import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this

const Button = () => {
  const navigate = useNavigate(); // ✅ Create the navigate function

  const goToProfile = () => {
    navigate('/profile'); // ✅ Navigate to the profile route
  };

  return (
    <div className="flex bg-white w-fit px-1.25 py-1.25 shadow-box-up rounded-3xl dark:bg-box-dark dark:shadow-box-dark-out">
      <div onClick={goToProfile} className="flex items-center justify-center h-12 w-12 bg-white rounded-3xl shadow-md hover:bg-gray-100 transition cursor-pointer">
        <a
          title="Go to about me page"
          className="text-light-blue-light hover:text-black dark:text-gray-400 border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary shadow-button-flat-nopressed hover:border-2 hover:shadow-button-flat-pressed focus:opacity-100 focus:outline-none active:border-2 active:shadow-button-flat-pressed font-medium rounded-full text-sm text-center dark:bg-button-curved-default-dark dark:shadow-button-curved-default-dark dark:hover:bg-button-curved-pressed-dark dark:hover:shadow-button-curved-pressed-dark dark:active:bg-button-curved-pressed-dark dark:active:shadow-button-curved-pressed-dark dark:focus:bg-button-curved-pressed-dark dark:focus:shadow-button-curved-pressed-dark dark:border-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Button;
