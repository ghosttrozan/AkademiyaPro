import React, { useEffect, useState, useRef } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [text, setText] = useState("");
  const placeholders = ["Search for students", "Search for teachers"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Using useRef to hold the text input and prevent unnecessary re-renders
  const textRef = useRef(text);

  const { name, logo } = useSelector((state) => state.school);

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement; // Use document.documentElement to make the whole page fullscreen

    if (document.fullscreenElement) {
      document.exitFullscreen(); // Exit fullscreen if already in fullscreen mode
    } else if (element.requestFullscreen) {
      element.requestFullscreen(); // Request fullscreen
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const typewriter = setInterval(() => {
      if (charIndex < placeholders[placeholderIndex].length) {
        setText((prev) => {
          // Updating the text without directly referencing state in the loop
          const newText = prev + placeholders[placeholderIndex][charIndex];
          textRef.current = newText; // Update the ref with the new text value
          return newText;
        });

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
        <Link to={"/dashboard"}>
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center">
              Academy
              <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mx-1"></span>
              Pro
            </h1>
          </div>
        </Link>
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
        <button onClick={toggleFullscreen}>
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
            placeholder={textRef.current} // Using the ref for text to prevent re-renders
            className="w-full max-w-lg px-28 py-1 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 text-gray-700 text-lg placeholder-gray-400"
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
            <Link to={"/principal"}>
              <IoMdPerson />
            </Link>
          </button>
        </div>

        {/* Dropdown */}
        <Link to={"/school"}>
          <div className="flex items-center space-x-2">
            <img
              src={logo} // Replace with your institute icon
              alt="Institute"
              className="h-8 w-8"
            />
            <span className="text-gray-800 hover:text-green-600">{name}</span>
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
        </Link>
      </div>
    </nav>
  );
};

export default Header;
