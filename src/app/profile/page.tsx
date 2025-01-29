"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-950">
            <p className="text-4xl text-white my-4">Profile Page</p>

            <h2 className="py-1 px-2 rounded bg-violet-600 text-white">
                {data === 'nothing' ? "..." :
                    <Link href={`/profile/${data}`} className="text-white hover:text-violet-200">
                        {data}
                    </Link>
                }
            </h2>

            <hr className="w-1/2 my-4 border-gray-700" />

            <button
                onClick={logout}
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
            >
                Get User Details
            </button>
        </div>

    )
}