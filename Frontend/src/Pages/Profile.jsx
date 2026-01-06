import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl, patch } from "../services/Endpoint";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../redux/AuthSlice";

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.FullName);
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("oldpassword", oldPassword);
    formData.append("newpassword", newPassword);

    if (profileImage) {
      formData.append("profile", profileImage);
    }

    try {
      const response = await patch(`auth/profile/${userId}`, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
          Update Profile
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : `${BaseUrl}/images/${user?.profile}`
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
            />

            <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white shadow">
              <FaCamera size={14} />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Old Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}
