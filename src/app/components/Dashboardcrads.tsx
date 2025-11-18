"use client";
import { MessageSquare, Clock, Check, Star } from "lucide-react";

export default function DashboardCards() {
  const stats = [
    {
      title: "Total Feedbacks",
      value: "5600+",
      icon: <MessageSquare size={28} />,
      bg: "bg-indigo-100",
      border: "border-indigo-400",
    },
    {
      title: "Pending Feedbacks",
      value: "5600+",
      icon: <Clock size={28} />,
      bg: "bg-amber-100",
      border: "border-amber-400",
    },
    {
      title: "Resolved Feedbacks",
      value: "5600+",
      icon: <Check size={28} />,
      bg: "bg-green-200",
      border: "border-green-500",
    },
    {
      title: "Average Ratings",
      value: "4.5",
      icon: <Star size={28} className="text-yellow-500" />,
      bg: "bg-gray-200",
      border: "border-gray-400",
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-6 px-1">Hello User</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between p-5 rounded-xl border ${item.border} ${item.bg} shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-normal text-gray-800">
                {item.title}
              </h3>
              {item.icon}
            </div>
            <p className="text-3xl font-extrabold mt-2 text-gray-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
