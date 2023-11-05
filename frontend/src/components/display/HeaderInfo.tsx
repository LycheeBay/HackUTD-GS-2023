import React from "react";
import StockMovement from "../data/StockMovement";

const HeaderInfo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-4xl font-bold">Company Name (TKR)</div>
      <StockMovement direction="up" stockValue={90} />
    </div>
  );
};

export default HeaderInfo;
