import React from "react";
import { useNavigate } from "react-router-dom";
import GoBack from "./GoBack";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data from Firestore:", userData);
  
          // Update state with user data
          setProfileData(userData);
        } else {
          console.log("No user data found");
        }
      }
    };
  
    fetchUserData();
  }, []);

  return (
    
    <div className="min-h-screen bg-[#EAF6FE] text-gray-800 px-4 sm:px-6 py-8 sm:py-10 font-sans">
      <GoBack onClick={() => navigate(-1)} />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">Personal Profile</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={profileData?.name || "Guest"}
              readOnly
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={profileData?.email || "No email associated with guest user"}
              readOnly
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone</label>
            <input
              type="text"
              value="+1234569123"
              readOnly
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Country</label>
            <input
              type="text"
              value="PAK"
              readOnly
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Preferred Language</label>
            <input
              type="text"
              value="English"
              readOnly
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-gray-100"
            />
          </div>

          
        </div>

        
      </div>
    </div>

    
  );
};

export default Profile;
