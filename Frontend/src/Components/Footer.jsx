import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        LOGO
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        A modern blogging platform built with MERN stack.
                        Share your thoughts, ideas, and knowledge with the world.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-white transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/blogs" className="hover:text-white transition">
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-white transition">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-white transition">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Follow Me
                    </h3>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-500 transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-700 transition"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} . All rights reserved.
            </div>
        </footer>
    );
}
