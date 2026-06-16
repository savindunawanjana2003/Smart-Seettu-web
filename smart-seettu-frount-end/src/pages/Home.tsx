
import React, { useState } from "react";
import img1 from "../assets/image/lankaSeetuHeder.png";

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Admin",
      text: "Welcome to Lanka Seetu! How can I help you?",
      time: "10:30 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          user: "You",
          text: newMessage,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Hero Image */}
      <div className="relative">
        <div className="w-full h-72 md:h-96 lg:h-[500px] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={img1}
            alt="Lanka Seetu Header"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>

          {/* Hero Text Overlay */}
          <div className="absolute bottom-8 left-0 right-0 text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
              Welcome to Lanka Seetu
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto drop-shadow">
              Your trusted platform for seamless connections and smart solutions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">124</p>
                <p className="text-xs text-gray-500">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">85</p>
                <p className="text-xs text-gray-500">Total Groups</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">342</p>
                <p className="text-xs text-gray-500">Messages Sent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">92%</p>
                <p className="text-xs text-gray-500">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Welcome Back! 👋
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Manage your groups, connect with colleagues, and streamline your
                workflow with Lanka Seetu. Start exploring the features
                available to you.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-sm">
                  View Dashboard
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition">
                  Explore Groups
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Smart Groups
                </h3>
                <p className="text-sm text-gray-500">
                  Create and manage groups with intelligent organization
                  features
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Live Chat</h3>
                <p className="text-sm text-gray-500">
                  Real-time messaging with team members and group admins
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Secure Access
                </h3>
                <p className="text-sm text-gray-500">
                  Enterprise-grade security with role-based access control
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Analytics</h3>
                <p className="text-sm text-gray-500">
                  Track engagement and performance with detailed insights
                </p>
              </div>
            </div>
          </div>

          {/* Chat/Support Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        Support Chat
                      </h4>
                      <p className="text-blue-100 text-xs">Online • Active</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="text-white/80 hover:text-white transition"
                  >
                    {showChat ? "✕" : "💬"}
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              {showChat && (
                <div className="h-80 flex flex-col">
                  <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                            msg.user === "You"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-white border border-gray-200 text-gray-700 rounded-bl-none"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p
                            className={`text-[10px] mt-0.5 ${msg.user === "You" ? "text-blue-200" : "text-gray-400"}`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 bg-white border-t border-gray-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-sm"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Collapsed Chat State */}
              {!showChat && (
                <div className="p-4 text-center">
                  <button
                    onClick={() => setShowChat(true)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:from-blue-100 hover:to-blue-200 transition"
                  >
                    💬 Start a Conversation
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Chat with our support team
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Experience Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                ⭐ User Experience
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-normal">
                  4.8/5
                </span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Helping you collaborate better with an intuitive interface
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                🚀 Fast
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                🔒 Secure
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                📱 Responsive
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                💡 Smart
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
