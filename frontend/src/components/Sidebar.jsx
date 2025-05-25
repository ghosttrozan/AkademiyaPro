import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const Navigation = [
    { name: "Dashboard", path: "/dashboard", icon: <HiOutlineHome /> },
    { name: "General Setting", path: "/school", icon: <IoSettingsOutline /> },
    { name: "Students", path: "/students", icon: <PiStudent /> },
    { name: "Teachers", path: "/all-teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", path: "/all-classes", icon: <SiGoogleclassroom /> },
  ];

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        when: "beforeChildren"
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: 0.15
      }
    }
  };

  const itemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        delay: 0.05 * i
      }
    }),
    closed: { opacity: 0, x: -30 }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(55, 65, 81, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: -5 }
  };

  const activeIndicatorVariants = {
    hidden: { width: 0 },
    visible: { width: 4 }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl"
        initial="closed"
        animate="open"
        exit="closed"
        variants={sidebarVariants}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between h-20 px-4 bg-gray-900 border-b border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Akademiya Pro
            </span>
          </motion.div>
          
          <motion.button
            onClick={closeSidebar}
            className="p-1 text-gray-400 hover:text-white rounded-full"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoMdClose size={20} />
          </motion.button>
        </motion.div>

        {/* Navigation */}
        <motion.nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {Navigation.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link to={item.path}>
                  <motion.div
                    className={`flex items-center px-4 py-3 rounded-lg relative overflow-hidden
                      ${isActive ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
                    variants={hoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 bg-blue-400 rounded-r"
                        variants={activeIndicatorVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <motion.span
                      className={`text-lg mr-3 ${
                        isActive ? "text-blue-400" : "text-gray-400"
                      }`}
                      variants={iconVariants}
                      initial="rest"
                      animate={hoveredItem === index ? "hover" : "rest"}
                    >
                      {item.icon}
                    </motion.span>
                    
                    {/* Text */}
                    <motion.span
                      className={`font-medium ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                      animate={{
                        opacity: hoveredItem === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Footer */}
        <motion.footer
          className="px-4 py-4 border-t border-gray-700 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              <div>v2.4.0</div>
              <div className="text-gray-500">© 2023 Akademiya</div>
            </div>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-white rounded-full"
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoSettingsOutline size={18} />
            </motion.button>
          </div>
        </motion.footer>
      </motion.aside>
    </>
  );
};

export default Sidebar;