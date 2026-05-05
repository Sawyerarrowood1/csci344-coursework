import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ items }) {
  console.log(items);

  const data = [
    { name: "Apples", value: 10 },
    { name: "Blueberry", value: 4 },
    { name: "Peach", value: 6 },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2f6fed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

