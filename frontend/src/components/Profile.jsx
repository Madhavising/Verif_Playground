import { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../api"
import axios from 'axios'

const capitalize = (str) =>
  str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

const Profile = () => {
  const user = useSelector((state) => state.user.userData);

  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState({
    displayName: `${capitalize(user.firstName)} ${capitalize(user.lastName)}`,
    email: user.email,
    workPhone: "",
    personalMobile: "",
    extension: "",
    department: "",
    designation: "",
    reportingTo: "",
    seatingLocation: "",
    companyName: user.companyName,
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-500 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfilePicChange = async (e) => {
    console.log("working")
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file); 

      try {
        const response = await axios.patch(`${baseUrl}/api/auth/update_profile`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        });


        console.log(response);

        // Optionally, update the profile picture URL with the server response
        // setProfilePic(`${baseUrl}/uploads/images/${response.data.file}`);
        setProfilePic(URL.createObjectURL(file)); // Temporary preview from local file
      } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
      }
    }
  };


  const handleSave = async () => {
    setEditMode(false);

    // let payload = {
    //   workPhone: userInfo.workPhone,
    //   personalMobile: userInfo.personalMobile,
    //   extension: userInfo.extension,
    //   department: userInfo.department,
    //   designation: userInfo.designation,
    //   reportingTo: userInfo.reportingTo,
    //   seatingLocation: userInfo.seatingLocation,
    // }
    console.log("userInfor", userInfo)
    console.log("profilePic", profilePic)
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditMode(false);
    toast.info("Changes canceled");
  };

  const renderField = (label, name) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
      <label className="w-40 text-gray-600 font-medium">{label}</label>
      {editMode ? (
        <input
          type="text"
          name={name}
          value={userInfo[name]}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto"
        />
      ) : (
        <p className="text-gray-800 text-sm truncate">{userInfo[name] || "-"}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 border-b">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-24 h-24 shrink-0 group">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover border border-gray-300"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
                {editMode && (
                  <div className="absolute inset-0 bg-black/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      title="Upload"
                    />
                    <span className="text-white text-xs">Upload</span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold truncate">
                  {userInfo.displayName.split(" ").map(capitalize).join(" ")}
                </h2>
                <p className="text-gray-600 truncate">{userInfo.email}</p>
                {user.role === "admin" && (
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    ✅ You have Admin Access
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2 text-sm shadow-sm"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm shadow-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md text-sm shadow-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-10">
            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-5 border-b pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-sm">
                {[
                  { label: "Display Name", name: "displayName" },
                  { label: "Email", name: "email" },
                  { label: "Work Phone", name: "workPhone" },
                  { label: "Personal Mobile", name: "personalMobile" },
                  { label: "Extension", name: "extension" },
                ].map((field) => (
                  <div key={field.name}>{renderField(field.label, field.name)}</div>
                ))}
              </div>
            </section>

            {/* Work Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-700 mb-5 border-b pb-2">
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-sm">
                {[
                  { label: "Designation", name: "designation" },
                  { label: "Department", name: "department" },
                  { label: "Reporting To", name: "reportingTo" },
                  { label: "Seating Location", name: "seatingLocation" },
                  { label: "Company", name: "companyName" },
                ].map((field) => (
                  <div key={field.name}>{renderField(field.label, field.name)}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
