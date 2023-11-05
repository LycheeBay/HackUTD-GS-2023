import React from "react";

type MediumTextTypes = {
  children: string;
};

const MediumText = ({ children }: MediumTextTypes) => {
  return <div className="text-xl font-bold">{children}</div>;
};

export default MediumText;
