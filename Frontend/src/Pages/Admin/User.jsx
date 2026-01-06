import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { delet, get } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const response = await delet(`/dashboard/delete/${userId}`);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setLoadData(!loadData);
      } else {
        toast.error("Failed to delete the user.");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await get("/dashboard/users");
        setUsers(response.data.Users || []);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [loadData]);

  return (
    <div className="bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        All Users
      </h1>

      {/* Table Wrapper */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {user.FullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
