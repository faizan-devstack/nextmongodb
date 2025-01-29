export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-950">
            <p className="text-4xl text-white">
                User Id:
                <span className="p-2 ml-2 rounded bg-orange-600 text-white hover:bg-orange-500 transition duration-300">
                    {params.id}
                </span>
            </p>
        </div>

    )
}

