import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let Navigation = [
    { name: "Dashboard", path: "/dashboard", icon: <HiOutlineHome /> },
    { name: "General Setting", path: "/school", icon: <IoSettingsOutline /> },
    { name: "Students", path: "", icon: <PiStudent /> },
    { name: "Teachers", path: "/all-teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", path: "/all-classes", icon: <SiGoogleclassroom /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-60 flex flex-col w-64 bg-white shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 bg-blue-600 text-white text-xl font-bold">
          School Dashboard
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {Navigation.map((item, index) => (
            <Link
            key={index}
              to={item.path}
              className="flex gap-4 text-lg items-center px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-blue-100 hover:text-blue-600"
            >
              <h1>{item.icon}</h1>
              <h1 className="text-gray-600">{item.name}</h1>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
