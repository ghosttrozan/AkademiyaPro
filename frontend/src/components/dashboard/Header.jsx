import React, { useEffect, useState } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

const Header = () => {
  const [text, setText] = useState("");
  const placeholders = ["Search for students", "Search for teachers"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typewriter = setInterval(() => {
      setText((prev) =>
        charIndex < placeholders[placeholderIndex].length
          ? prev + placeholders[placeholderIndex][charIndex]
          : prev
      );

      if (charIndex < placeholders[placeholderIndex].length) {
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typewriter);
        setTimeout(() => {
          setCharIndex(0);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setText(""); // Clear text before next placeholder starts
        }, 1500); // Delay before next placeholder starts
      }
    }, 100);

    return () => clearInterval(typewriter);
  }, [charIndex, placeholderIndex]);

  return (
    <nav className="flex z-50 fixed w-full top-0 items-center justify-between px-6 py-4 bg-white shadow-xl">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-gray-800 flex items-center">
            Academy
            <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mx-1"></span>
            Pro
          </h1>
        </div>
        {/* Menu Icon */}
        <button className="pl-6 block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        {/* Fullscreen Icon */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9V5.25A2.25 2.25 0 016 3h3.75m6.75 0H18a2.25 2.25 0 012.25 2.25V9m0 6v3.75A2.25 2.25 0 0118 21h-3.75m-6.75 0H6a2.25 2.25 0 01-2.25-2.25V15"
            />
          </svg>
        </button>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder={text} // Adding the typewriter effect
            className="w-full max-w-lg px-16 py-1 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 text-gray-700 text-lg placeholder-gray-400"
          />
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.61 0 7.5 7.5 0 0010.61 0z"
            />
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Icons */}
        <div className="flex items-center space-x-3">
          <button className="text-3xl hover:text-red-600 text-blue-600">
            <IoChatbubbles />
          </button>
          <button className="text-3xl hover:text-red-600 text-blue-600">
            <IoNotifications />
          </button>
          <button className="text-3xl hover:text-red-600 text-blue-600">
          <IoMdPerson />
          </button>
        </div>

        {/* Dropdown */}
        <div className="flex items-center space-x-2">
          <img
            src="data:image/jpeg;base64,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" // Replace with your institute icon
            alt="Institute"
            className="h-8 w-8"
          />
          <span className="text-gray-800">Institute Name</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Header;
