import React, { useState } from "react";
import MediumText from "../universal/MediumText";
import { SegmentedControl } from "@mantine/core";
import LineGraph from "./LineGraph";

const SwapView = ({ data }: any) => {
  const [view, setView] = useState("Revenue Growth %");

  const views = [
    "Revenue Growth %",
    "Operating Margin %",
    "Net Income $",
    "EBITDA $",
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <MediumText>{view}</MediumText>
        <SegmentedControl
          value={view}
          onChange={setView}
          data={views.map((view) => ({ label: view, value: view }))}
          size="xs"
          radius="md"
        />
      </div>

      {views.map((viewOption, index) => (
        <div key={viewOption} className="flex justify-center w-full">
          {view === viewOption && (
            <LineGraph
              dataset={data[index + 1]}
              labels={["First Quarter 2023", "Second Quarter 2023", "Third Quarter 2023", "Predicted Fourth Quarter"]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SwapView;

//
