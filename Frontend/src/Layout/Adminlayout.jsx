import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

export default function Adminlayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Dashboard | BLOG</title>
      </Helmet>

      {/* Top Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm p-4 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

    </>
  );
}
