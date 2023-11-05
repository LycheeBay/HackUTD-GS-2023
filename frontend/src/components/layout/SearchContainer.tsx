import React, { ReactNode } from 'react'

type ContainerTypes  = {
  children: ReactNode
}

const SearchContainer = ({children}: ContainerTypes) => {
  return (
    <div className="p-6 shadow-lg rounded-lg h-fit bg-white">
      {children}
    </div>
  );
};

export default SearchContainer;
