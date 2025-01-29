export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-6">
      {/* Website Introduction */}
      <h1 className="text-5xl mb-6 text-blue-400 tracking-wide">
        Welcome
      </h1>
      <p className="text-lg text-center max-w-3xl mb-8 text-gray-400">
        This full-stack application showcases a variety of modern features, including secure user authentication, dynamic routing, and seamless integration with third-party services. Dive in to explore all its functionalities!
      </p>

      {/* Features Section */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg mb-10 w-full max-w-4xl">
        <h2 className="text-3xl mb-6 text-orange-400 border-b border-gray-600 pb-2">
          Features and Technologies
        </h2>
        <ul className="list-disc list-inside space-y-4 text-gray-300">
          <li>
            <span className="text-blue-300">Login / Logout and Signup:</span> Secure account creation and login / logout functionality.
          </li>
          <li>
            <span className="text-blue-300">Forgot Password:</span> Request password reset links via email.
          </li>
          <li>
            <span className="text-blue-300">Reset Password:</span> Easily update your password through a secure flow.
          </li>
          <li>
            <span className="text-blue-300">Dynamic Routing:</span> Fetch user-specific details using Next.js dynamic routes.
          </li>
          <li>
            <span className="text-blue-300">Show/Hide Password:</span> Eye icon toggle for better password visibility.
          </li>
          <li>
            <span className="text-blue-300">Mailtrap Integration:</span> Simulate and debug email workflows efficiently.
          </li>
          <li>
            <span className="text-blue-300">MongoDB Database:</span> Store user data securely in a robust backend.
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-xl mb-4 font-medium text-gray-400">
          Ready to explore? Start by logging into your account:
        </p>
        <a
          href="/profile"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200"
        >
          Go to Login Page
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-600 text-sm text-center">
        © 2025 Faizan. All rights reserved.
      </footer>
    </div>
  );
}
