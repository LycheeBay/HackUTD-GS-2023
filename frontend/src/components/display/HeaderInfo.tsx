import React from "react";

type HeaderInfoTypes = {
  company: string;
  ticker: string;
}

const HeaderInfo = ({company, ticker}: HeaderInfoTypes) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-4xl font-bold">{`${company || "Apple Inc."} (${ticker || "AAPL"})`}</div>
    </div>
  );
};

export default HeaderInfo;
