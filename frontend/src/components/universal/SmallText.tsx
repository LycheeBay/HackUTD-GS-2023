import React from "react";

type SmallTextTypes = {
  children: string;
};

const SmallText = ({ children }: SmallTextTypes) => {
  return <div className="text-md font-bold text-gray-800">{children}</div>;
};

export default SmallText;

