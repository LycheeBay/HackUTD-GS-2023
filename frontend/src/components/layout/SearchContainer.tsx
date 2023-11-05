import React, { ReactNode } from 'react'

type ContainerTypes  = {
  children: ReactNode
}

const SearchContainer = ({children}: ContainerTypes) => {
  return (
    <div className="p-6 col-span-2 shadow-lg bg-opacity-70 bg-sky-200 rounded-lg">
      {children}
    </div>
  );
};

export default SearchContainer;
