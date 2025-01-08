import React from "react";
import { TfiTarget } from "react-icons/tfi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EstimatedFeeCard = () => {
  const estimation = 10000;
  const collections = 1000;
  const remainings = estimation - collections;
  const percentage = (collections / estimation) * 100;

  return (
    <div className="bg-white h-full p-8 w-[25%] border-2 rounded-xl hover:shadow-2xl flex flex-col justify-between">
      <h2 className="text-lg text-gray-600 font-semibold mb-4">
        Estimated Fee This Month
      </h2>

      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-2xl mr-2">
            <TfiTarget />
          </h1>
          <h1 className="text-xl font-semibold">Estimation</h1>
        </div>
        <span className="text-red-500 text-4xl font-bold mb-4">₹{estimation.toLocaleString()}</span>
        <div className="w-32 h-32">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textColor: "#4A90E2",
              pathColor: "#4A90E2",
              trailColor: "#E6E6E6",
            })}
          />
        </div>
      </div>

      <div className="flex justify-between px-10">
        <div className="flex flex-col items-center">
          <span className="text-green-500 font-semibold text-2xl">
            ₹{collections.toLocaleString()}
          </span>
          <span className="text-lg text-gray-600 font-medium">Collections</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[2px] h-14 bg-gray-600"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-500 font-semibold text-2xl">
            ₹{remainings.toLocaleString()}
          </span>
          <span className="text-lg text-gray-600 font-medium">Remainings</span>
        </div>
      </div>
    </div>
  );
};

export default EstimatedFeeCard;
