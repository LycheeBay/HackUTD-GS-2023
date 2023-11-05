// import React, { useState } from "react";
// import MediumText from "../universal/MediumText";
// import { SegmentedControl } from "@mantine/core";
// import LineGraph from "./LineGraph";
//
// const SwapView = ({data}: any) => {
//   const [view, setView] = useState("Predicted Earnings");
//
//   function determView() {
//     if (view === "Predicted Performance") {
//       return 1;
//     } else {
//       return 2;
//     }
//   }
//
//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between">
//         <MediumText>{view}</MediumText>
//         <SegmentedControl
//           value={view}
//           onChange={setView}
//           data={[
//             { label: "Net Income", value: "Predicted Net Income" },
//             { label: "EPS", value: "Predicted EPS" },
//             { label: "Revenue Growth", value: "Predicted Revenue Growth" },
//             { label: "ROE", value: "Predicted Return on Equity" },
//             { label: "Operating Margin", value: "Predicted Operating Margin" },
//           ]}
//           size="sm"
//           radius="md"
//         />
//       </div>
//
//       {determView() === 1
//         ? (
//           <LineGraph
//             dataset={[1, 2, 3, 4]}
//             labels={["First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter"]}
//           />
//         )
//         : (
//           <LineGraph
//             dataset={[3, 2, 3, 1]}
//             labels={["one", "two", "three", "four"]}
//           />
//         )}
//     </div>
//   );
// };
//
// export default SwapView;
//
//
//
//
import React, { useState } from "react";
import MediumText from "../universal/MediumText";
import { SegmentedControl } from "@mantine/core";
import LineGraph from "./LineGraph";

const SwapView = ({ data }: any) => {
  const [view, setView] = useState("Net Income");

  const views = [
    "Net Income",
    "Revenue Growth",
    "EBITDA",
    "Operating Margin",
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
              labels={["First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter"]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SwapView;

//
