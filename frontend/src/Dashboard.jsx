import React, { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-gray-800 text-white h-full fixed lg:w-64 transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">eSkooly</h1>
          <button
            className="text-white"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {[
            "Dashboard",
            "General Settings",
            "Classes",
            "Subjects",
            "Students",
            "Employees",
            "Accounts",
            "Fees",
            "Salary",
            "Attendance",
            "Timetable",
            "Homework",
          ].map((item) => (
            <div key={item} className="hover:text-gray-300 cursor-pointer">
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button
            className="lg:hidden text-gray-800"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button className="hidden lg:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              App Store
            </button>
            <button className="hidden lg:block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
              Google Play
            </button>
            <div className="bg-gray-200 p-2 rounded-full">👤</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Students", value: "0", color: "bg-blue-500" },
              { title: "Total Employees", value: "0", color: "bg-purple-500" },
              { title: "Revenue", value: "$0", color: "bg-red-500" },
              { title: "Total Profit", value: "$0", color: "bg-blue-700" },
            ].map((card) => (
              <div
                key={card.title}
                className={`${card.color} text-white p-4 rounded-lg shadow-lg`}
              >
                <h2 className="text-xl">{card.title}</h2>
                <p className="text-2xl mt-2">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Welcome Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Welcome to Admin Dashboard</h2>
            <p className="mt-2 text-gray-600">
              Your account is not verified yet! Please{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Verify now!
              </span>
            </p>
          </div>

          {/* Statistics */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Statistics</h2>
            <div className="h-32 bg-gray-200 rounded-lg mt-4 flex items-center justify-center">
              <span>Chart Placeholder</span>
            </div>
          </div>

          {/* Estimated Fee */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Estimated Fee This Month</h2>
              <p className="text-red-500 text-2xl mt-2">$0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Collections</h2>
                  <p className="text-green-500 text-2xl">$0</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Remainings</h2>
                  <p className="text-red-500 text-2xl">$0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
