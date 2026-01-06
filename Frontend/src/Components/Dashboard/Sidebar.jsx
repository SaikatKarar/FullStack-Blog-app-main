import React from "react";
import {
  FaHome,
  FaPlusSquare,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Add Post",
      path: "/dashboard/addpost",
      icon: <FaPlusSquare />,
    },
    {
      name: "All Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "All Posts",
      path: "/dashboard/allposts",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-wide">
          Admin Panel
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                ${isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-400">
        © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
