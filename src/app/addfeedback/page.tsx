"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [selectedDate, setSelectedDate] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  const handleContactChange = (method) => {
    setContactMethod(method);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center mb-8 border rounded-xl p-6 shadow-sm">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">Helen Guapa</h2>
          <p className="text-gray-600">Customer service</p>
          <p className="text-gray-600">Zemen Bank</p>
          <p className="text-gray-600">Head Office</p>
        </div>

        {/* Type */}
        <label className="block font-medium mb-1">Type</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Comment</option>
          <option>Complaint</option>
          <option>Suggestion</option>
        </select>

        {/* Date & Severity */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Date of Issue</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Severity Issue</label>
            <div className="flex flex-wrap gap-2 text-sm">
              {['Minor', 'Moderate', 'Major', 'Critical'].map((level) => (
                <label key={level} className="flex items-center gap-1">
                  <input type="checkbox" /> {level}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <label className="block font-medium mb-1">Describe issue</label>
        <textarea
          className="w-full border rounded-lg p-3 h-32 mb-1"
          placeholder="Type issue here please"
        ></textarea>
        <p className="text-right text-gray-500 text-sm mb-6">3500 characters left</p>

        {/* Rating */}
        <label className="block font-medium mb-2">Rate the service here please</label>
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          {["5 star", "4 star", "3 star", "2 star", "1 star"].map((s) => (
            <label key={s} className="flex items-center gap-1">
              <input type="radio" name="rating" /> {s}
            </label>
          ))}
        </div>

        {/* Contact Method */}
        <label className="block font-medium mb-2">Preferred Contact Method</label>
        <div className="flex gap-6 mb-4 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={contactMethod === "phone"}
              onChange={() => handleContactChange(contactMethod === "phone" ? "" : "phone")}
            />{" "}
            By Phone
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={contactMethod === "email"}
              onChange={() => handleContactChange(contactMethod === "email" ? "" : "email")}
            />{" "}
            By Email
          </label>
        </div>

        {/* Conditional Input Fields */}
        {contactMethod === "phone" && (
          <div className="mb-6">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border rounded-lg p-2"
            />
          </div>
        )}

        {contactMethod === "email" && (
          <div className="mb-6">
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border rounded-lg p-2"
            />
          </div>
        )}

        {/* Upload Proof */}
        <label className="block font-medium mb-2">Upload any Proof</label>
        <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center mb-6">
          <div className="text-gray-500 text-sm mb-2">Capture the image</div>
          <button className="bg-amber-700 text-white px-4 py-2 rounded-lg">Upload an image</button>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-amber-700 text-white py-3 rounded-lg text-lg font-medium">
          Submit
        </button>
      </div>
    </div>
  );
}
