import React from "react";
import LatestPost from "../Components/LatestPost";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | BLOG</title>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide">
            Welcome to My Blog
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed">
            Dive into a world of creativity, insights, and inspiration.
            Discover the extraordinary in the ordinary.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
              Explore Posts
            </button>

            <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-200 hover:bg-white hover:text-black transition">
              Latest Articles
            </button>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="w-full bg-gray-100 py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <LatestPost />
        </div>
      </section>
    </>
  );
}
