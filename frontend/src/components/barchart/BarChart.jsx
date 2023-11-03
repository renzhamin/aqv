import React from "react";
import GroupedBarChart from "./GroupedBarChart"; // Import the custom hook

const data = [
  { month: "Jan", group1: 20, group2: 30, group3: 10 },
  { month: "Feb", group1: 25, group2: 35, group3: 15 },
];

function BarChartEx() {
  return (
    <div>
      <h1>Grouped Bar Chart Example</h1>
      {GroupedBarChart(
        data,
        "month",
        ["group1", "group2", "group3"],
        "Month",
        "Value"
      )}
    </div>
  );
}

export default BarChartEx;
