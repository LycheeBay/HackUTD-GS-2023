import React from "react";

type LargeTextTypes = {
  children: string;
};

const LargeText = ({ children }: LargeTextTypes) => {
  return <div className="text-4xl font-bold">{children}</div>;
};

export default LargeText;
