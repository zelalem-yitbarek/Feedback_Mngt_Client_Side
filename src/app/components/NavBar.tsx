"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, Bell } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="w-full bg-white relative shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="text-gray-900 font-medium text-sm">Feedback</span>
          <span className="block w-8 h-[2px] bg-blue-400 mt-4 rounded-full"></span>
        </div>

        {/* CENTER MENU (Desktop) */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-gray-800 text-sm hover:text-black">Home</Link>
          <Link href="/feedbacks" className="text-gray-800 text-sm hover:text-black">Feedbacks</Link>

          <Link href="/newfeedback" className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-900">
            Add Feedback
          </Link>
        </div>

        {/* RIGHT SIDE (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {/* Notification Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Notification Popup */}
          {showNotifications && (
            <div className="absolute right-20 top-10 w-72 bg-white rounded-lg shadow-xl p-4 z-30">
              <h4 className="font-semibold mb-2">Notifications</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="border-b pb-2">New feedback received</li>
                <li className="border-b pb-2">Your report was reviewed</li>
                <li>System update available</li>
              </ul>
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src="/user_image.jpeg"
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <ChevronDown size={18} />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg z-30 py-2 text-sm">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
              </div>
            )}
          </div>

          <Image src="/eth_flag.png" alt="ET Flag" width={30} height={20} className="rounded" />
          <span className="text-gray-800 text-sm">አማ</span>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => {
            setIsOpen(!isOpen);
            setDropdownOpen(false);
            setShowNotifications(false);
          }}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-sm">
          <Link href="/" className="block text-gray-800 font-medium">Home</Link>

          <Link
            href="/newfeedback"
            className="block bg-black text-white text-center py-2 rounded-md"
          >
            Add Feedback
          </Link>

          {/* Mobile Notification */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            <span className="text-gray-800 text-sm">Notifications (3)</span>
          </div>

          {showNotifications && (
            <div className="bg-white border rounded-lg p-3 text-sm shadow-lg">
              <ul className="space-y-2 text-gray-700">
                <li className="border-b pb-2">New feedback received</li>
                <li className="border-b pb-2">Your report was reviewed</li>
                <li>System update available</li>
              </ul>
            </div>
          )}

          {/* Mobile profile */}
          <div className="flex items-center space-x-3 pt-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Image src="/user_image.jpeg" alt="User" width={35} height={35} className="rounded-full" />
            <span className="text-gray-800 text-sm">Profile</span>
          </div>

          {dropdownOpen && (
            <div className="bg-white border rounded-lg p-2 text-sm shadow-md">
              <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100">Profile</Link>
              <Link href="/settings" className="block px-3 py-2 hover:bg-gray-100">Settings</Link>
              <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600">Logout</button>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-4">
            <Image src="/eth_flag.png" alt="Flag" width={30} height={20} className="rounded" />
            <span className="text-gray-800 text-sm">አማ</span>
          </div>
        </div>
      )}
    </nav>
  );
}
