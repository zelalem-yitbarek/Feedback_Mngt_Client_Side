"use client";

import { CalendarDays } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "New branch opened at Adama city",
    date: "Tue Nov 12",
    message:
      "We are delighted to announce that we have opened our 115th branch at Adama City",
  },
  {
    id: 2,
    title: "New branch opened at Adama city",
    date: "Tue Nov 12",
    message:
      "We are delighted to announce that we have opened our 115th branch at Adama City",
  },
  {
    id: 3,
    title: "New branch opened at Adama city",
    date: "Tue Nov 12",
    message:
      "We are delighted to announce that we have opened our 115th branch at Adama City",
  },
];

export default function Announcements() {
  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Announcements</h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-green-300 border border-green-400 rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[200px] hover:shadow-lg transition-all duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-green-800 text-sm mt-2">
                <CalendarDays size={16} />
                <span>{item.date}</span>
              </div>
              <p className="text-gray-800 mt-3 text-sm leading-relaxed">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
