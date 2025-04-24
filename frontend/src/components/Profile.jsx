import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100  min-h-full flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 md:w-1/3">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          {/* <div className="w-24 h-24 rounded-full bg-gray-300 mb-4">
            
            <img
              src={user.profilePicture || "/assets/default-avatar.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div> */}
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* User Info Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">First Name:</label>
            <p className="text-gray-600">{user.firstName}</p>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">Last Name:</label>
            <p className="text-gray-600">{user.lastName}</p>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">Email:</label>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium text-gray-700">Company Name:</label>
            <p className="text-gray-600">{user.companyName || "Not provided"}</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
