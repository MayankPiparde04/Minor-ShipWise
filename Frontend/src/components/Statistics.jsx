import React from 'react';
import { FaCartPlus, FaRegChartBar, FaUserAlt, FaCog } from 'react-icons/fa'; // Import the icons
import ChartLine from './ChartLine';
import ChartPie from './ChartPie';

const Statistics = () => {
  const StatsCard = ({ icon, percentage, value, label }) => {
    return (
      <div className="card transform hover:scale-105 transition max-w-full duration-300 shadow-xl rounded-lg bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          {icon}
          <div className="bg-teal-300 rounded-full h-6 px-2 flex items-center text-black text-sm font-semibold">
            <span>{percentage}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl text-gray-100 font-bold leading-8">{value}</div>
          <div className="text-base text-gray-400">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* <Sidebar /> */}
      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 ease-in-out px-4 py-6 ml-0 mb-4 pb-10 bg-gray-950">
        <div className="flex flex-col gap-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-100">Dashboard</h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            <StatsCard
              icon={<FaCartPlus className="h-7 w-7 text-blue-400" />}
              percentage="30%"
              value="4,510"
              label="Item Sales"
            />
            <StatsCard
              icon={<FaRegChartBar className="h-7 w-7 text-yellow-400" />}
              percentage="25%"
              value="3,200"
              label="Orders"
            />
            <StatsCard
              icon={<FaUserAlt className="h-7 w-7 text-pink-600" />}
              percentage="40%"
              value="2,100"
              label="Revenue"
            />
            <StatsCard
              icon={<FaCog className="h-7 w-7 text-green-400" />}
              percentage="50%"
              value="1,850"
              label="New Users"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
            {/* Line Chart */}
            <div className="flex-1 bg-white p-5 rounded-lg shadow-lg">
              <ChartLine />
            </div>

            {/* Pie Chart */}
            <div className="flex-1 bg-white p-5 rounded-lg shadow-lg">
              <ChartPie />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
