'use client'
import React, { useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import { Button } from '../components/ui/button'
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useAuth } from '@/hooks/useAuth'
import { Toast } from '../components/ui/toast'
import Navbar from '@/app/components/NavBar'
import Fotter from '@/app/components/Footer'
import { Phone, EyeOff, Eye, Lock } from 'lucide-react'
import type { AxiosError } from "axios"

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<{ message?: string }>
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
  }
  if (error && typeof error === "object" && "message" in error) {
    return String((error as any).message)
  }
  return "Login failed. Please try again."
}

type LoginFormValues = {
  phoneNumber: string
  password: string
}

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticating } = useAuth({ redirectOnFail: false })

  const form = useReactHookForm<LoginFormValues>({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  })

  const handleSubmit = async (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        // Success handled in useAuth hook
      },
      onError: (error) => {
        const message = getErrorMessage(error)
        Toast({
          title: "Login Error",
          description: message,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray">
        <div className="bg-white shadow-md rounded-xl p-8 w-[380px] text-center border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm mb-6">
            You have been missed, please login to access
          </p>

          {/* ✔ FIXED: react-hook-form submission */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            
            {/* PHONE NUMBER */}
            <div className="flex items-center border border-gray-300 rounded-md mb-4 px-3">
              <Phone className="text-gray-400 mr-2 w-4 h-4" />
              <span className="text-gray-500 text-sm mr-2">+251</span>

              <input
                {...form.register("phoneNumber")}
                type="text"
                placeholder="Phone Number"
                className="w-full py-2 outline-none text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center border border-gray-300 rounded-md mb-2 px-3">
              <Lock className="text-gray-400 mr-2 w-4 h-4" />
              <input
                {...form.register("password")}
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

            <button
              type="submit"
              disabled={isAuthenticating}
              className="bg-black text-white w-full py-2 rounded-md mb-4 hover:bg-gray-800 transition cursor-pointer"
            >
              {isAuthenticating ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
      <Fotter />
    </>
  )
}

export default Page
