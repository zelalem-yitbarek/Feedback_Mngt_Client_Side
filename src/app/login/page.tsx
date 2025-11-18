'use client'
import React from 'react'
import Navbar from '@/app/components/NavBar'
import Fotter from '@/app/components/Footer'
import { useState } from 'react'
import { Phone ,EyeOff,Eye,Lock} from 'lucide-react'
const page = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <>
    <Navbar/>
     <div className="flex items-center justify-center min-h-screen bg-gray">
        <div className="bg-white shadow-md rounded-xl p-8 w-[380px] text-center border border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm mb-6">
          You have been missed please login to access
        </p>
        <div className="flex items-center border border-gray-300 rounded-md mb-4 px-3">
            <Phone className="text-gray-400 mr-2 w-4 h-4" />
          <span className="text-gray-500 text-sm mr-2">+251</span>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full py-2 outline-none text-sm"
          />
        </div>
         <div className="flex items-center border border-gray-300 rounded-md mb-2 px-3">
            <Lock className="text-gray-400 mr-2 w-4 h-4" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full py-2 outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
         </div>
          <div className="text-right mb-4">
          <a href="#" className="text-xs text-gray-500 hover:text-black">
            Forget Password
          </a>
        </div>
         <button className="bg-black text-white w-full py-2 rounded-md mb-4 hover:bg-gray-800 transition cursor-pointer">
          Login
        </button>
        <p className="text-xs text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-amber-600 hover:underline">
            Register
          </a>
        </p>
        </div>
     </div>
    <Fotter/>
    </>
  )
}

export default page