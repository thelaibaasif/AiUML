import React from 'react';
import Stars from '../components/Stars';
import { useNavigate } from "react-router-dom";
import GoBack from "./GoBack";

const Feedback = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f8fa] px-4">
      <GoBack onClick={() => navigate(-1)} />
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full border border-slate-200 text-slate-700">
        <h1 className="text-center text-red-700 text-2xl font-extrabold mb-6">
          ✨ We Value Your Feedback!
        </h1>

        <textarea
          placeholder="Type your feedback here..."
          className="w-full h-32 rounded-lg p-4 bg-slate-100 border border-slate-300 placeholder:text-slate-500 outline-none resize-none mb-6"
        />

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-600 mb-6 text-center">
            How would you rate your experience?
          </h2>
          <Stars />
        </div>

        <div className="flex justify-center gap-4">
          <button className="px-5 py-2 bg-gray-100 hover:bg-red-100 text-red-700 font-semibold border border-red-700 rounded-full transition duration-300">
            Submit
          </button>
          <button className="px-5 py-2 bg-red-700 hover:bg-gray-800 text-white font-semibold border border-red-700 rounded-full transition duration-300 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
