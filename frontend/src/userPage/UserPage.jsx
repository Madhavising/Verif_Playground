import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const UserPage = () => {
  const user = useSelector((state) => state.user.userData);
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddUser = async () => {
    const { firstName, lastName, email, password, role } = newUser;
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!role) newErrors.role = "Role is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if valid

    const capitalize = (str) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

    const payload = {
      ...newUser,
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      companyName: user?.companyName || "",
    };

    try {
      let response = await axios.post(`${baseUrl}/api/auth/register`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("res", response);

      if (response.status === 201) {
        toast.success("User added successfully!");
        setShowModal(false);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        setErrors({});
        setTrigger(trigger + 1);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let response = await axios.get(
          `${baseUrl}/api/auth/getAllUsers/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching users :", error.message);
      }
    };

    getAllUsers();
  }, [user._id, trigger]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-10">
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight">
              {user.companyName} Users
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Manage access and team roles
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {/* Table Card */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
  {/* Table: visible on md and up */}
  <div className="hidden md:block w-full overflow-x-auto">
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase text-gray-600 tracking-wider">
        <tr>
          <th className="px-6 py-3 text-left whitespace-nowrap">User</th>
          <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
          <th className="px-6 py-3 text-left whitespace-nowrap">Role</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div>
                <div className="font-semibold">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 capitalize whitespace-nowrap">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Card list: visible below md */}
  <div className="md:hidden space-y-4 p-4">
    {users.map((user) => (
      <div
        key={user._id}
        className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div>
            <div className="font-semibold text-gray-800 text-lg">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 capitalize">Role: {user.role}</div>
      </div>
    ))}
  </div>
</div>


      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Add New User
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email", type: "email" },
                { label: "Password", key: "password", type: "password" },
              ].map(({ label, key, type = "text" }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={label}
                    onChange={(e) => {
                      setNewUser({ ...newUser, [key]: e.target.value });
                      if (errors[key])
                        setErrors((prev) => ({ ...prev, [key]: "" }));
                    }}
                    className={`w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring-2 text-sm ${
                      errors[key]
                        ? "border-red-500 ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors[key] && (
                    <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}

              {/* Role Dropdown */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  onChange={(e) => {
                    setNewUser({ ...newUser, role: e.target.value });
                    if (errors.role)
                      setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                  className={`w-full px-4 py-2 rounded-lg shadow-sm border bg-white text-sm focus:outline-none focus:ring-2 ${
                    errors.role
                      ? "border-red-500 ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="px-5 py-2 text-sm rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="px-6 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Save Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Save
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to save this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleAddUser();
                  setShowConfirm(false);
                  setShowModal(false);
                }}
                className="px-5 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
