"use client";

import { Calendar, Clock } from "lucide-react";

const feedbacks = [
  {
    id: "FB001",
    title: "Loan Service issue",
    status: "Resolved",
    color: "bg-green-100 text-green-700",
    message: "Your feedback has been resolved yesterday at 4:00pm.",
    date: "Nov 12 2025",
    time: "4:00pm",
  },
  {
    id: "FB002",
    title: "Loan Service issue",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    message:
      "Your feedback is under review. Please wait until we give you any response.",
    date: "Nov 12 2025",
    time: "4:00pm",
  },
  {
    id: "FB003",
    title: "Loan Service issue",
    status: "Rejected",
    color: "bg-red-100 text-red-700",
    message:
      "Your feedback was rejected by the admin yesterday from the main office.",
    date: "Nov 12 2025",
    time: "4:00pm",
  },
];

export default function RecentUpdates() {
  return (
    <section className="mt-8 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Updates</h2>
        <button className="text-sm text-gray-500 hover:text-indigo-600">
          see all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-red-50 border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-all"
          >
            <p className="text-sm text-gray-500">{item.id}</p>

            {/* Title and Status aligned in one line */}
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-medium ${item.color}`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mt-2">{item.message}</p>

            <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
