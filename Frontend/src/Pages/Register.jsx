import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", value.fullName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("profile", value.image);

    try {
      const response = await post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2">

            <span className="text-2xl font-extrabold text-gray-900">
              LOGO
            </span>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 text-center mb-6">
          Create an account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <img
                src={
                  value.image
                    ? URL.createObjectURL(value.image)
                    : "https://via.placeholder.com/150"
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Upload profile picture
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={value.fullName}
              onChange={(e) =>
                setValue({ ...value, fullName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              value={value.email}
              onChange={(e) =>
                setValue({ ...value, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={value.password}
              onChange={(e) =>
                setValue({ ...value, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
