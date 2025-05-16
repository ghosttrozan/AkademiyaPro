import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isOpen] = useState(true); // Controlled by parent component
  const Navigation = [
    { name: "Dashboard", path: "/dashboard", icon: <HiOutlineHome /> },
    { name: "General Setting", path: "/school", icon: <IoSettingsOutline /> },
    { name: "Students", path: "", icon: <PiStudent /> },
    { name: "Teachers", path: "/all-teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", path: "/all-classes", icon: <SiGoogleclassroom /> },
  ];

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    closed: { 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.15
      } 
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    closed: { opacity: 0, x: -20 }
  };

  const staggerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
    <motion.div
      className="flex h-screen fixed"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <motion.div
        variants={sidebarVariants}
        className={`fixed inset-y-0 left-0 z-60 flex flex-col w-64 bg-gray-800 shadow-2xl`}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Akademiya Pro
          </span>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="flex-1 px-3 py-6 space-y-1"
          variants={staggerVariants}
        >
          {Navigation.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-300 rounded-lg mx-2
                  hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-blue-400
                  transition-all duration-300 group"
              >
                <motion.span
                  className="text-gray-400 group-hover:text-blue-400"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.span>
                <span className="ml-3 font-medium text-sm tracking-wide">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Footer */}
        <motion.div
          className="px-4 py-3 border-t border-gray-700 mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center text-sm text-gray-400">
            v2.4.0
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;