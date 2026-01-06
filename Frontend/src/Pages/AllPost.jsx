import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BaseUrl, delet, get } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadedata, setLoadedata] = useState(false);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      const response = await delet(`/blog/delete/${postId}`);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setLoadedata(!loadedata);
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleUpdate = (postId) => {
    console.log(`Post with ID ${postId} updated.`);
    // navigate(`/admin/update-post/${postId}`)
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await get("/blog/GetPosts");
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [loadedata]);

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          All Posts
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all published blog posts
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={`${BaseUrl}/images/${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 px-5 py-4 border-t">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                >
                  <FaTrashAlt size={14} />
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(post._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
                >
                  <FaEdit size={14} />
                  Update
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
