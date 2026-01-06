import React, { useState } from "react";
import { post } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (image) {
        formData.append("postimg", image);
      }

      formData.append("title", title);
      formData.append("desc", description);

      const response = await post("/blog/create", formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (

      <div className="w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Add New Post
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-6 space-y-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700
              cursor-pointer"
            />
            {image && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="6"
              placeholder="Write your post description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg
              font-medium hover:bg-indigo-700 transition-all"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>

  );
}
