import React from 'react';
import { motion } from 'framer-motion';
import { FiTool, FiClock, FiMail, FiHome } from 'react-icons/fi';
import { FaHardHat, FaTools, FaRocket } from 'react-icons/fa';

const UnderConstruction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const toolVariants = {
    animate: {
      rotate: [0, 10, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <motion.div
        className="max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <motion.div 
            className="flex items-center justify-center"
            variants={itemVariants}
          >
            <FaHardHat className="text-4xl mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Under Construction</h1>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          <motion.div 
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <motion.div
              variants={toolVariants}
              animate="animate"
              className="text-6xl text-indigo-500"
            >
              <FaTools />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6"
            variants={itemVariants}
          >
            We're building something amazing!
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-600 text-center mb-8"
            variants={itemVariants}
          >
            Our team is working hard to bring you an incredible experience. 
            We'll be launching soon with features that will blow your mind.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-indigo-50 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <FiClock className="text-2xl text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium">Coming Soon</h3>
                <p className="text-sm text-gray-600">Launching in Q4 2025</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-indigo-50 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <FiTool className="text-2xl text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium">In Development</h3>
                <p className="text-sm text-gray-600">Active coding in progress</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-indigo-50 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <FiMail className="text-2xl text-indigo-600 mr-3" />
              <div>
                <h3 className="font-medium">Get Notified</h3>
                <p className="text-sm text-gray-600">Join our waitlist</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={containerVariants}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
              variants={itemVariants}
            >
              <FaRocket className="mr-2" />
              Join Waitlist
            </motion.button>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg flex items-center justify-center"
              variants={itemVariants}
            >
              <FiHome className="mr-2" />
              Back to Home
            </motion.a>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-gray-500 text-sm">
          <motion.p variants={itemVariants}>
            © {new Date().getFullYear()} Akademiya Pro. All rights reserved.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;