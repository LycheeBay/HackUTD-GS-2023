import React, { ReactNode } from "react";

type ContainerTypes = {
  children: ReactNode;
};

const Container = ({ children }: ContainerTypes) => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-8 pb-32">{children}</div>
    </div>
  );
};

export default Container;
