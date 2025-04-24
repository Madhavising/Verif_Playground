import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

// Capitalize first letter utility
const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const Profile = () => {
  const { user, isAdmin } = useSelector((state) => state);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  const { firstName, lastName, email, companyName } = user.userData;

  return (
      <div className="m-auto bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md md:max-w-lg transition duration-300">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-6xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            {capitalize(firstName)} {capitalize(lastName)}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-4 divide-y divide-gray-200">
          <InfoRow label="First Name" value={capitalize(firstName)} />
          <InfoRow label="Last Name" value={capitalize(lastName)} />
          <InfoRow label="Email" value={email} />
          <InfoRow label="Company Name" value={companyName || "Not provided"} />
          {isAdmin && (
            <div className="pt-4 text-center text-sm text-green-600 font-semibold">
              ✅ You have Admin Access
            </div>
          )}
        </div>
      </div>
  );
};

// Reusable info row component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center pt-4">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default Profile;
