'use client'

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image';
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)


  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-950">
      <Link href="/" className='pb-3'>
        <Image
          src="/home.svg"
          alt="Home"
          width={40}
          height={40}
          priority
        />
      </Link>
      <h1 className="text-white text-2xl">Login here</h1>
      <hr className="w-1/2 my-4 border-gray-700" />

      <label htmlFor="email" className="text-gray-400">Email</label>
      <input
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="text-gray-400">Password</label>
      <div className="relative">
        <input
          className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          id="password"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
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

      <div className="pb-2">
        <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300">
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className={`px-3 py-1 rounded mb-4 text-white ${buttonDisabled
          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500 focus:outline-none"}`}
      >
        {loading ? "Processing..." : "Log in"}
      </button>

      <div className="text-gray-400">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300">
          Signup
        </Link>
      </div>
    </div>

  )
}

