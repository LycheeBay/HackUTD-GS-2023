import React, { ReactNode } from "react";
import MediumText from "../universal/MediumText";
import { Icon } from "@iconify/react/dist/iconify.js";

type InfoCardTypes = {
  title: string;
  icon: string;
  children: ReactNode;
};

const InfoCard = ({ children, title, icon }: InfoCardTypes) => {
  return (
    <div className="col-span-1 p-4 cursor-pointer rounded-md shadow-md hover:scale-105 ease-in-out duration-150 bg-sky-50">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon icon={icon} width={24} height={24} />
          <MediumText>
            {title}
          </MediumText>
        </div>
        <div className="text-md text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
