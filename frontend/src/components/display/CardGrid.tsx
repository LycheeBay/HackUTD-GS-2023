import React, { ReactNode } from "react";

type CardGridTypes = {
  children: ReactNode
}

const CardGrid = ({children}: CardGridTypes) => {
  return (
    <div className="grid grid-cols-3 gap-6 h-fit">
      {children}
    </div>
  );
};

export default CardGrid;
