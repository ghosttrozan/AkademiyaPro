import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">School Management System</h1>
        <nav>
          <Link to={'signin'} className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold mr-2">
            Sign In
          </Link >
          <Link to={'signup'} className="bg-white text-purple-600 px-4 py-2 rounded-md font-semibold">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h2 className="text-4xl font-extrabold mb-4">
          Simplify School Administration
        </h2>
        <p className="text-lg mb-8">
          Manage students, teachers, classes, and school operations effortlessly with our system.
        </p>
        <div>
          <Link to={'/signin'} className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 font-bold mr-4">
            Sign In
          </Link >
          <Link to={'/signup'} className="bg-green-400 text-black px-6 py-3 rounded-lg shadow-md hover:bg-green-500 font-bold">
            Sign Up
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-blue-800 text-center">
        <p>© 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
