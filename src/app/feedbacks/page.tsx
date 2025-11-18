"use client";
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabStatusMap = {
    "In Review": "Pending",
    Accepted: "Resolved",
    Rejected: "Rejected",
  };

  const feedbacks = [
    {
      id: "FB001",
      title: "Loan Service issue",
      message: "Your Feedback has been resolved yesterday at 4:00pm.",
      status: "Resolved",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
    {
      id: "FB002",
      title: "Loan Service issue",
      message:
        "Your Feedback is on review, please wait until we give you any response.",
      status: "Pending",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
    {
      id: "FB003",
      title: "Loan Service issue",
      message:
        "Your Feedback is rejected by the admin yesterday from the main office.",
      status: "Rejected",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
    {
      id: "FB004",
      title: "Loan Service issue",
      message: "Your Feedback has been resolved yesterday at 4:00pm.",
      status: "Resolved",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
    {
      id: "FB005",
      title: "Loan Service issue",
      message:
        "Your Feedback is on review, please wait until we give you any response.",
      status: "Pending",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
    {
      id: "FB006",
      title: "Loan Service issue",
      message:
        "Your Feedback is rejected by the admin yesterday from the main office.",
      status: "Rejected",
      date: "Nov 12 2025",
      time: "4:00pm",
    },
  ];

  const filteredFeedbacks =
    activeTab === "All"
      ? feedbacks
      : feedbacks.filter((f) => f.status === tabStatusMap[activeTab]);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          {/* Centered Tabs */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-8 pb-2">
              {["All", "In Review", "Accepted", "Rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 font-medium transition-colors ${
                    activeTab === tab
                      ? "text-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72 sm:ml-auto">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredFeedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.08)] border border-gray-100 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm text-gray-500">{item.id}</p>
                  <p
                    className={`text-xs font-semibold ${
                      item.status === "Resolved"
                        ? "text-green-600"
                        : item.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    •{item.status}
                  </p>
                </div>

                <h3 className="font-extrabold text-[1.1rem] text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">{item.message}</p>
              </div>

              <div className="flex items-center text-xs text-gray-400 mt-6 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
