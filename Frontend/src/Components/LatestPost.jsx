import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function LatestPost() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const handleBlog = (id) => {
        navigate(`/blog/${id}`);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const request = await get("/blog/GetPosts");
                setBlogs(request.data.posts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, []);

    const truncateText = (text, wordLimit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    return (
        <section className="w-full">
            {/* Section Title */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Recent Posts
                </h2>
                <p className="mt-2 text-gray-500">
                    Discover our latest thoughts and insights
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs &&
                    blogs.map((elem) => (
                        <div
                            key={elem._id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                        >
                            {/* Image */}
                            <div className="h-52 overflow-hidden">
                                <img
                                    src={`${BaseUrl}/images/${elem.image}`}
                                    alt={elem.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {elem.title}
                                </h3>

                                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                    {truncateText(elem.desc, 20)}
                                </p>

                                <button
                                    onClick={() => handleBlog(elem._id)}
                                    className="mt-5 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                                >
                                    Read Article →
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
}
