import React from "react";
import { Icon } from "@iconify/react";

type StockMovementTypes = {
  direction: string;
  stockValue: number;
};

const StockMovement = ({ direction, stockValue }: StockMovementTypes) => {
  const numberToCurrFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <>
      {direction === "up" &&
        (
          <div className="flex items-center gap-1 text-green-500 font-bold text-xl">
            <Icon icon="typcn:arrow-sorted-up" width={44} height={44} />
            {numberToCurrFormat(stockValue)}
          </div>
        )}
      {direction === "down" &&
        (
          <div className="flex items-center gap-1 text-red-500 font-bold text-xl">
            <Icon icon="typcn:arrow-sorted-down" width={44} height={44} />
            {numberToCurrFormat(stockValue)}
          </div>
        )}
    </>
  );
};

export default StockMovement;
