import React, { useEffect, useState } from "react";
import { get } from "../../services/Endpoint";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await get("/dashboard");
        const response = request.data;

        if (request.status === 200) {
          setPosts(response.Posts || []);
          setUsers(response.Users || []);
          setComments(response.comments || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-indigo-600 rounded-xl shadow-md p-6 text-white">
          <h5 className="text-lg font-semibold">Total Users</h5>
          <p className="text-4xl font-bold mt-2">
            {users.length}
          </p>
        </div>

        {/* Posts */}
        <div className="bg-emerald-600 rounded-xl shadow-md p-6 text-white">
          <h5 className="text-lg font-semibold">Total Posts</h5>
          <p className="text-4xl font-bold mt-2">
            {posts.length}
          </p>
        </div>

        {/* Comments */}
        <div className="bg-amber-500 rounded-xl shadow-md p-6 text-white">
          <h5 className="text-lg font-semibold">Total Comments</h5>
          <p className="text-4xl font-bold mt-2">
            {comments.length}
          </p>
        </div>
      </div>
    </div>
  );
}
