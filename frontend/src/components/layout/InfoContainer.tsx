import React, { ReactNode } from 'react'

type ContainerTypes  = {
  children: ReactNode
}

const InfoContainer = ({children}: ContainerTypes) => {
  return (
    <div className="col-span-5 p-2 shadow-lg bg-opacity-70 rounded-lg">
      {children}
    </div>
  );
};

export default InfoContainer;
