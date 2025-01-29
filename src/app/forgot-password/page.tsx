'use client'

import React, { useState } from "react";
import axios from 'axios'

export default function page() {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await axios.post("/api/users/forgot-password", { email });
            setMessage(response.data.message || "Check your email for the reset link!");
            setEmail("");
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.error || "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
                <h2 className="text-2xl text-center text-white mb-4">
                    Forgot Password
                </h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Enter your email address to receive a password reset link.
                </p>

                {message && (
                    <p className="text-green-400 text-center mb-4">
                        {message}
                    </p>
                )}
                {error && (
                    <p className="text-red-400 text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-700 text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 text-white rounded-md ${isLoading
                            ? "bg-blue-700 cursor-not-allowed opacity-50"
                            : "bg-blue-600 hover:bg-blue-500"
                            }`}
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>

    );
};
