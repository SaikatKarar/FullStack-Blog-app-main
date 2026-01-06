import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get, post } from "../services/Endpoint";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Blog() {
  const { postId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState("");
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        setSinglePost(request.data.Post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]);

  const onSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      const request = await post("/comment/addcomment", {
        comment,
        postId,
        userId: user._id,
      });

      if (request.data.success) {
        toast.success(request.data.message);
        setComment("");
        setLoaddata((prev) => !prev);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <section className="w-full bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          {singlePost?.title}
        </h1>

        {/* Image */}
        {singlePost?.image && (
          <img
            src={`${BaseUrl}/images/${singlePost.image}`}
            alt={singlePost.title}
            className="w-full max-h-[450px] object-cover rounded-xl mb-8"
          />
        )}

        {/* Content */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {singlePost?.desc}
        </p>

        {/* Divider */}
        <hr className="my-10" />

        {/* Comment Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Leave a Comment
          </h3>

          <form onSubmit={onSubmitComment} className="space-y-4">
            <textarea
              rows="4"
              placeholder="Write your comment..."
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Divider */}
        <hr className="my-10" />

        {/* Comments */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Comments
          </h3>

          {singlePost?.comments?.length > 0 ? (
            <div className="space-y-4">
              {singlePost.comments.map((elem) => (
                <div
                  key={elem._id}
                  className="flex gap-4 bg-gray-50 p-4 rounded-xl border"
                >
                  <img
                    src={`${BaseUrl}/images/${elem.userId.profile}`}
                    alt={elem.userId.FullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h5 className="font-semibold text-gray-800">
                      {elem.userId.FullName}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {elem.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
