'use client';

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.reponse.data);

        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-950 text-gray-200">
            <h1 className="text-4xl text-white">Verify Email</h1>

            <h2 className={`p-2 my-2 rounded ${token ? "bg-orange-500 text-black" : "bg-gray-600 text-gray-400"}`}>
                {token ? `${token}` : "No token"}
            </h2>

            {verified && (
                <div className="flex flex-col justify-center items-center mt-4">
                    <h2 className="text-xl pb-2 text-green-400">You are now verified</h2>
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none">
                        <Link href="/login" className="text-white">
                            Login
                        </Link>
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4">
                    <h2 className="text-2xl bg-red-500 text-black p-2 rounded">Error</h2>
                </div>
            )}
        </div>

    )

}