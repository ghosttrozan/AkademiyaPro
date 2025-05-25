import React from "react";
import { TfiTarget } from "react-icons/tfi";
import { FaRupeeSign } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EstimatedFeeCard = () => {
  const estimation = 10000;
  const collections = 1000;
  const remainings = estimation - collections;
  const percentage = (collections / estimation) * 100;

  return (
    <div className="bg-white h-full p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Fee Collection Status
        </h2>
        <div className="flex items-center text-blue-600">
          <TfiTarget className="mr-1" />
          <span className="text-sm font-medium">This Month</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-40 h-40 mb-4">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textSize: '16px',
              textColor: "#27AE60",
              pathColor: "#27AE60",
              trailColor: "#ECF0F1",
              pathTransitionDuration: 1,
            })}
          />
        </div>
        
        <div className="text-center mb-2">
          <p className="text-gray-500 text-sm mb-1">Total Estimated Fees</p>
          <div className="flex items-center justify-center text-2xl font-bold text-gray-800">
            <FaRupeeSign className="mr-1" />
            {estimation.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center text-green-600 mb-1">
              <span className="text-sm font-medium">Collected</span>
            </div>
            <div className="flex items-center text-green-700 font-semibold">
              <FaRupeeSign className="mr-1 text-sm" />
              <span className="text-xl">{collections.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center text-orange-600 mb-1">
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="flex items-center text-orange-700 font-semibold">
              <FaRupeeSign className="mr-1 text-sm" />
              <span className="text-xl">{remainings.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedFeeCard;