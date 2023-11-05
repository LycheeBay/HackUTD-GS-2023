import React, { useState } from "react";
import MediumText from "../universal/MediumText";
import { SegmentedControl } from "@mantine/core";
import LineGraph from "./LineGraph";

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
          <LineGraph
            dataset={[1, 2, 3, 4, 5]}
            labels={["one", "two", "three", "four", "five"]}
          />
        )
        : (
          <LineGraph
            dataset={[3, 2, 3, 1, 5]}
            labels={["one", "two", "three", "four", "five"]}
          />
        )}
    </div>
  );
};

export default SwapView;
