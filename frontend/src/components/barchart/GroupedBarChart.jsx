import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const colors = ["#E57333", "#3366CC", "#33CC57", "#E63391", "#B933CC"];

const GroupedBarChart = (data, xKey, yKeys, xLabel, yLabel) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={xKey}
        label={{ value: xLabel, position: "insideBottom", offset: -5 }}
      />
      <YAxis
        label={{ value: yLabel, angle: -90, position: "insideLeft", offset: 5 }}
      />
      <Tooltip />
      <Legend />
      {yKeys.map((key, index) => (
        <Bar dataKey={key} key={key} fill={colors[index % colors.length]} />
      ))}
    </BarChart>
  );
};

export default GroupedBarChart;
