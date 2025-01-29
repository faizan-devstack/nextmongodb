'use client'

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data)
      router.push("/verifyemail")
    } catch (error: any) {
      console.log("Signup failed", error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-950">
      <h1 className="text-white text-2xl py-4">Signup here</h1>
      <hr className="border-gray-600 w-3/4 mb-4" />

      <label htmlFor="username" className="text-gray-400">Username</label>
      <input
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <label htmlFor="email" className="text-gray-400">Email</label>
      <input
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password" className="text-gray-400">Password</label>
      <div className='relative'>
        <input
          className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          id="password"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 bottom-4 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
          aria-label={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`px-3 py-1 rounded mb-4 focus:outline-none ${buttonDisabled
          ? "bg-gray-600 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 focus:border-blue-700"}`}
      >
        {loading ? "Processing..." : "Sign Up"}
      </button>

      <div className="text-gray-400">
        Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-500">Login</Link>
      </div>
    </div>

  )
}

