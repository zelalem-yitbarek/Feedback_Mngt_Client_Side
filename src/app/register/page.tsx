"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simulate dummy signup
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        router.push("/login");
      }, 1500);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
          <h1 className="text-2xl font-semibold text-center mb-2">
            Are you new to this
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Are you new to the platform? Please register here
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring focus:ring-black/20"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type="tel"
                placeholder="+251 9XXXXXXXX"
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring focus:ring-black/20"
                pattern="\+2519\d{8}"
                title="Enter a valid Ethiopian phone number starting with +2519"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring focus:ring-black/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-500 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring focus:ring-black/20"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 transition ${
                loading ? "opacity-80 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Registered successfully!
            </h2>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
