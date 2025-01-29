import { Suspense } from "react"
import ResetPasswordForm from "./reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 shadow-md rounded-lg p-8">
        <h2 className="text-2xl text-center mb-4 text-white">Reset Password</h2>
        <p className="text-sm text-gray-400 text-center mb-6">Enter your new password below to reset it.</p>
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}

