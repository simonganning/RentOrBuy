import React from "react";
import { Line } from "react-chartjs-2";
import './App.css';

export function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true  // Set to true to show legends, helps identify which line is which
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;