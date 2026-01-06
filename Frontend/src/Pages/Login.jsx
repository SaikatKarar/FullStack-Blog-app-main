import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = await post("/auth/login", value);

            if (request.status === 200) {
                dispatch(setUser(request.data.user));
                toast.success(request.data.message);
                navigate("/");
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
                    Sign in to your account
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={value.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            required
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={value.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account yet?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
}
