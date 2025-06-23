// import React from "react";
// import { useSelector } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";

// // Capitalize utility
// const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

// const Profile = () => {
//   const { user, isAdmin } = useSelector((state) => state);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-lg font-semibold text-gray-600 animate-pulse">
//           Loading Profile...
//         </div>
//       </div>
//     );
//   }

//   const { firstName, lastName, email, companyName } = user.userData;

//   return (
//     <div className="flex justify-center items-center min-h-full bg-gray-100">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md md:max-w-lg transition duration-300">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center mb-6">
//           <FaUserCircle className="text-6xl text-red-500 mb-2" />
//           <h2 className="text-2xl font-bold text-gray-800">
//             {capitalize(firstName)} {capitalize(lastName)}
//           </h2>
//           <p className="text-sm text-gray-500">{email}</p>
//         </div>

//         {/* Info Section */}
//         <div className="space-y-4 divide-y divide-gray-200">
//           <InfoRow label="First Name" value={capitalize(firstName)} />
//           <InfoRow label="Last Name" value={capitalize(lastName)} />
//           <InfoRow label="Email" value={email} />
//           <InfoRow label="Company Name" value={companyName || "Not provided"} />
//           {isAdmin && (
//             <div className="pt-4 text-center text-sm text-green-600 font-semibold">
//               ✅ You have Admin Access
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable info row
// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between items-center pt-4">
//     <span className="text-gray-600 font-medium">{label}:</span>
//     <span className="text-gray-700">{value}</span>
//   </div>
// );

// export default Profile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

// Capitalize utility
const capitalize = (str) =>
  str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const Profile = () => {
  const { user, isAdmin } = useSelector((state) => state);

  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState({
    displayName: `${capitalize(
      user?.userData?.firstName
    )} ${capitalize(user?.userData?.lastName)}`,

    email: user?.userData?.email ,
    workPhone: "",
    personalMobile: "",
    extension: "",
    department: "",
    designation: "",
    reportingTo: "",
    seatingLocation: "",
    company: user?.userData?.companyName,
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
    // Optional: API call
  };

  const handleCancel = () => {
    setEditMode(false);
    toast.info("Changes canceled");
    // Optional: Reset logic here
  };

  const renderField = (label, name) => (
    <div className="flex items-center gap-4 w-full">
      <label className="w-40 text-gray-600 font-medium shrink-0">{label}</label>
      {editMode ? (
        <input
          type="text"
          name={name}
          value={userInfo[name]}
          onChange={handleInputChange}
          className="flex-1 p-2 border rounded-md text-sm"
        />
      ) : (
        <p className="text-gray-800 text-sm flex-1 truncate">
          {userInfo[name] || "-"}
        </p>
      )}
    </div>
  );

  return (
    <div className="h-full w-full bg-gray-100 overflow-hidden py-4 px-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md w-full min-h-[80vh] flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 shrink-0">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover border"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    title="Upload"
                  />
                )}
              </div>
              <div className="truncate">
                <h2 className="text-xl font-semibold truncate">
                  {userInfo.displayName.split(" ").map(capitalize).join(" ")}
                </h2>

                <p className="text-gray-600 truncate">{userInfo.email}</p>

                {isAdmin && (
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    ✅ You have Admin Access
                  </p>
                )}
              </div>
            </div>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-4">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 text-sm">
                {[
                  { label: "Display Name", name: "displayName" },
                  { label: "Email", name: "email" },
                  { label: "Work Phone", name: "workPhone" },
                  { label: "Personal Mobile", name: "personalMobile" },
                  { label: "Extension", name: "extension" },
                ].map((field) => (
                  <div key={field.name}>
                    {renderField(field.label, field.name)}
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-8 border-t border-gray-200" />

            {/* Work Information */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-4">
                Work Information
              </h3>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 text-sm">
                {[
                  { label: "Designation", name: "designation" },
                  { label: "Department", name: "department" },
                  { label: "Reporting To", name: "reportingTo" },
                  { label: "Seating Location", name: "seatingLocation" },
                  { label: "Company", name: "company" },
                ].map((field) => (
                  <div key={field.name}>
                    {renderField(field.label, field.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
