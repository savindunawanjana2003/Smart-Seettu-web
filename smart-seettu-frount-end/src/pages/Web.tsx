import React from "react";
import "../hirowPage.css";
import Header from "../components/Nave-bar";
// import url('https://fonts.cdnfonts.com/css/poppins');

import img4 from "../assets/image/4.jpg";
import img3 from "../assets/image/3.jpg";
import img5 from "../assets/image/5.jpg";
import img6 from "../assets/image/6.jpg";
import img7 from "../assets/image/7.jpg";
import img8 from "../assets/image/Wealthy Place.jpeg";
import { Zap, Users, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-br from-black via-gray-900 to-green-950 text-green-400 mt-10">
        <div className="banner">
          <div
            className="slider"
            style={{ "--quantity": 6 } as React.CSSProperties}
          >
            <div
              className="item"
              style={{ "--position": 1 } as React.CSSProperties}
            >
              <img src={img4} alt="" />
            </div>

            <div
              className="item"
              style={{ "--position": 2 } as React.CSSProperties}
            >
              <img src={img3} alt="" />
            </div>

            <div
              className="item"
              style={{ "--position": 3 } as React.CSSProperties}
            >
              <img src={img5} alt="" />
            </div>

            <div
              className="item"
              style={{ "--position": 4 } as React.CSSProperties}
            >
              <img src={img6} alt="" />
            </div>

            <div
              className="item"
              style={{ "--position": 5 } as React.CSSProperties}
            >
              <img src={img7} alt="" />
            </div>

            <div
              className="item"
              style={{ "--position": 6 } as React.CSSProperties}
            >
              <img src={img8} alt="" />
            </div>
          </div>

          <div className="content ">
            <h1>SMART SEETTU</h1>

            <div className="author">
              <h2>Manage Your Seettu Easily</h2>

              <p>
                <b>Digital Seettu Management Platform</b>
              </p>

              <p>
                Track members, manage payments, monitor collections, and
                simplify your seettu operations in one place.
              </p>
            </div>

            {/* <div className="model"></div> */}
          </div>
        </div>
      </div>
      {/* ================================================================================================ */}
      <section className="seettuWorld relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Heading - Access the Seettu System */}
          <div className="mb-12 text-center">
            <h2 className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl font-bold">
              Access the Seettu System
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mt-4"></div>
          </div>

          {/* Main Content Box */}
          <div className="border border-white/10 hover:border-green-500/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 bg-white/5 backdrop-blur-sm">
            <div className="text-center max-w-3xl mx-auto py-12 px-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Seettu </span>
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Management Hub
                </span>
              </h3>

              {/* Description */}
              <div className="space-y-3 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  Manage Seettu groups and contributions easily. Handle members,
                  payments, and records in one place.
                </p>
                <p>
                  Simple way to track savings and updates. Control all Seettu
                  activities from one dashboard.
                </p>
                <p className="text-amber-400 font-medium">
                  Easy and fast Seettu management system.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div className="group cursor-pointer">
                  <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Active Groups
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    10K+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Happy Members
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    ₿2M+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Transactions
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-10">
                <button className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 inline-flex items-center gap-2">
                  <span>Get Started</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================================================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Zap size={16} className="text-green-400" />
            <span className="text-gray-300 text-sm">
              Enterprise Grade Platform
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Start scaling with</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              confidence
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-green-400" />
              <span className="text-white font-bold">800,000+</span>
              <span className="text-gray-400">businesses</span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300">on Upwork</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/25 flex items-center gap-2">
              how it works
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>
            <button className="border border-gray-700 hover:border-green-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all hover:bg-white/5">
              Sign up
            </button>
          </div>
        </div>
      </section>
      {/* ================================================================================================ */}
    </div>
  );
};

export default Home;
