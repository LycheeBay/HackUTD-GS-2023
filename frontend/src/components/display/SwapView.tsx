import React, { useState } from "react";
import MediumText from "../universal/MediumText";
import { SegmentedControl } from "@mantine/core";

const SwapView = () => {
  const [view, setView] = useState("Predicted Earnings");

  function determView() {
    if (view === "Predicted Performance") {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <MediumText>{view}</MediumText>
        <SegmentedControl
          value={view}
          onChange={setView}
          data={[
            { label: "Earnings", value: "Predicted Earnings" },
            { label: "Perfomance", value: "Predicted Performance" },
          ]}
          size="md"
          radius="md"
        />
      </div>

      {determView() === 1
        ? (
          <div className="bg-black h-96">
            graph 1
          </div>
        )
        : (
          <div className="bg-white h-96">
            graph 2
          </div>
        )}
    </div>
  );
};

export default SwapView;
