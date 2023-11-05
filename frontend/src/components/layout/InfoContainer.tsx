import React, { ReactNode } from 'react'

type ContainerTypes  = {
  children: ReactNode
}

const InfoContainer = ({children}: ContainerTypes) => {
  return (
    <div className="p-4 shadow-lg bg-opacity-70 rounded-lg bg-gradient-to-tr from-white via-white to-green-50">
      {children}
    </div>
  );
};

export default InfoContainer;
