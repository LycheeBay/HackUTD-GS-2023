import React, { ReactNode } from "react";
import SmallText from "../universal/SmallText";
import LineGraph from "./LineGraph";
import { Icon } from "@iconify/react/dist/iconify.js";

const SampleStocks = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex gap-6 bg-white items-center col-span-1 rounded-md shadow-md cursor-pointer py-2 px-4">
        <Icon icon="ph:trend-up-bold" color="#17a34a" width={44} height={44} />
        <div>
          <div className="font-bold text-md underline text-gray-800">
            S&P 500
          </div>
          <div className="font-bold text-sm text-gray-700">$4,283.24</div>
          <div className="text-green-600 text-xs flex gap-2 items-center">
            <div className="font-bold ">
              +40.65
            </div>
            <div className="font-medium ">
              (+0.94%)
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 bg-white items-center col-span-1 rounded-md shadow-md cursor-pointer py-2 px-4">
        <Icon
          icon="ph:trend-down-bold"
          color="#dc2625"
          width={44}
          height={44}
        />
        <div>
          <div className="font-bold text-md underline text-gray-800">
            Dow 30
          </div>
          <div className="font-bold text-sm text-gray-700">$34,183.24</div>
          <div className="text-red-600 text-xs flex gap-2 items-center">
            <div className="font-bold ">
              -228.12
            </div>
            <div className="font-medium ">
              (-0.64%)
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 bg-white items-center col-span-1 rounded-md shadow-md cursor-pointer py-2 px-4">
        <Icon icon="ph:trend-up-bold" color="#17a34a" width={44} height={44} />
        <div>
          <div className="font-bold text-md underline text-gray-800">
            NASDAQ
          </div>
          <div className="font-bold text-sm text-gray-700">$12,103.10</div>
          <div className="text-green-600 text-xs flex gap-2 items-center">
            <div className="font-bold ">
              +183.32
            </div>
            <div className="font-medium ">
              (+1.26%)
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 bg-white items-center col-span-1 rounded-md shadow-md cursor-pointer py-2 px-4">
        <Icon icon="ph:trend-up-bold" color="#17a34a" width={44} height={44} />
        <div>
          <div className="font-bold text-md underline text-gray-800">
            Russell 2000
          </div>
          <div className="font-bold text-sm text-gray-700">$1,762.89</div>
          <div className="text-green-600 text-xs flex gap-2 items-center">
            <div className="font-bold ">
              +44.73
            </div>
            <div className="font-medium ">
              (+2.56%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleStocks;
