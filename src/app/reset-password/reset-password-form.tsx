"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      await axios.post("/api/users/reset-password", {
        token,
        newPassword,
      })
      toast.success("Password reset successfully")
      router.push("/login")
    } catch (error: any) {
      console.log("Reset password failed", error.message)
      toast.error(error.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
    } else {
      setError("")
    }
  }, [newPassword, confirmPassword])

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <label htmlFor="newpassword" className="text-gray-400 pb-1">
        New Password
      </label>
      <input
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        id="newpassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />

      <label htmlFor="confirmpassword" className="text-gray-400 pb-1">
        Confirm Password
      </label>
      <input
        className="p-2 bg-gray-800 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
        id="confirmpassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className={`p-2 border rounded-lg mb-4 focus:outline-none w-full ${
          loading
            ? "bg-gray-600 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 focus:border-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Reset Password"}
      </button>
    </div>
  )
}

