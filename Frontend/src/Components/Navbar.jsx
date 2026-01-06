import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const request = await post("/auth/logout");
      if (request.status === 200) {
        dispatch(removeUser());
        toast.success(request.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-slate-900 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          LOGO
        </h1>
      </Link>

      {/* Right Section */}
      <div className="relative flex items-center gap-4">
        {!user ? (
          <Link to="/login">
            <button className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Sign In
            </button>
          </Link>
        ) : (
          <>
            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-indigo-500"
            >
              <img
                src={`${BaseUrl}/images/${user.profile}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-14 w-48 bg-slate-800 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm text-white font-semibold">
                    {user.FullName}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>

                <ul className="text-sm text-slate-200">
                  {user.role === "admin" && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-slate-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to={`/profile/${user._id}`}
                      className="block px-4 py-2 hover:bg-slate-700"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
