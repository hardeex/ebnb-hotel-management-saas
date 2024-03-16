// PieChart.js
import React, { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";

const PieChart = ({ data }) => {
  console.log(data.revenue);

  const chartData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [data.revenue],
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default PieChart;
