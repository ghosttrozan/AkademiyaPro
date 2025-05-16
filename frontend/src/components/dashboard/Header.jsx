import React, { useEffect, useState, useRef } from "react";
import { IoChatbubbles, IoNotifications } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FiSearch, FiMenu, FiMaximize, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar";

const Header = () => {
  const [text, setText] = useState("");
  const placeholders = ["Search for students", "Search for teachers"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const textRef = useRef(text);
  const { name, logo } = useSelector((state) => state.school);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const typewriter = setInterval(() => {
      if (charIndex < placeholders[placeholderIndex].length) {
        setText((prev) => {
          const newText = prev + placeholders[placeholderIndex][charIndex];
          textRef.current = newText;
          return newText;
        });
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typewriter);
        setTimeout(() => {
          setCharIndex(0);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setText("");
        }, 1500);
      }
    }, 100);
    return () => clearInterval(typewriter);
  }, [charIndex, placeholderIndex]);

  return (
    <div className={`${isOpen ? "overflow-y-hidden" : ""}`}>
      <nav
        className={`flex z-30 fixed w-full top-0 items-center justify-between px-6 py-3 
          bg-gray-900 shadow-lg transition-all duration-300
          ${isScrolled ? "py-2 bg-opacity-95 backdrop-blur-sm" : "bg-opacity-100"}`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to={"/dashboard"} className="flex items-center group">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center group-hover:from-purple-500 group-hover:to-blue-400 transition-all duration-300">
                <span className="mr-1">Akademiya</span>
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mx-1 animate-pulse"></span>
                <span>Pro</span>
              </h1>
            </div>
          </Link>
          
          {/* Menu Button */}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5 text-gray-300" />
          </button>
          
          {/* Fullscreen Button */}
          <button 
            onClick={toggleFullscreen} 
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle fullscreen"
          >
            <FiMaximize className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Center Section - Search */}
        <div className="flex items-center mx-4 flex-1 max-w-2xl">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={textRef.current}
              className="block w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        text-gray-200 placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-blue-400 transition-colors duration-200 relative">
              <IoChatbubbles className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-yellow-400 transition-colors duration-200 relative">
              <IoNotifications className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-green-400 transition-colors duration-200">
              <Link to={"/principal"}>
                <IoMdPerson className="w-5 h-5" />
              </Link>
            </button>
          </div>

          {/* Profile Dropdown */}
          <Link to={"/school"} className="group">
            <div className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <img
                src={logo}
                alt="Institute"
                className="h-8 w-8 rounded-full border-2 border-blue-500 object-cover"
              />
              <span className="text-gray-200 font-medium group-hover:text-blue-400 transition-colors duration-200">
                {name}
              </span>
              <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
            </div>
          </Link>
        </div>
      </nav>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 shadow-xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isOpen && <Sidebar />}
      </div>
    </div>
  );
};

export default Header;