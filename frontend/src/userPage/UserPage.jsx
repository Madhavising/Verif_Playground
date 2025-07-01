import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from "../api";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";

const UserPage = () => {
  const user = useSelector((state) => state.user.userData);
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

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
      str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

    const payload = {
      ...newUser,
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      companyName: user?.companyName || '',
    };

    try {
      let response = await axios.post(`${baseUrl}/api/auth/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });


      console.log("res", response)

      if (response.status === 201) {
        toast.success("User added successfully!");
        setShowModal(false);
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: '',
        });
        setErrors({});
        setTrigger(trigger + 1)
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/auth/getAllUsers/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Company: {user.companyName}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{user.firstName + " " + user.lastName}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setNewUser({ ...newUser, firstName: e.target.value });
                    if (errors.firstName) {
                      setErrors((prev) => ({ ...prev, firstName: '' }));
                    }
                  }}
                  className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${errors.firstName ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setNewUser({ ...newUser, lastName: e.target.value });
                    if (errors.lastName) {
                      setErrors((prev) => ({ ...prev, lastName: '' }));
                    }
                  }}
                  className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${errors.lastName ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setNewUser({ ...newUser, password: e.target.value });
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }
                  }}
                  className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Role */}
              <div>
                <select
                  onChange={(e) => {
                    setNewUser({ ...newUser, role: e.target.value });
                    if (errors.role) {
                      setErrors((prev) => ({ ...prev, role: '' }));
                    }
                  }}
                  className={`w-full border px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 ${errors.role ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
