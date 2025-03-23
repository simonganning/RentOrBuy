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
              display: true,  // Set to true to show legends, helps identify which line is which
              labels: {
                font: {
                  weight: 'bold', // Make legend labels bold
                  size: 14        // Increase font size for better visibility
                },
                color: 'black' // Set legend text color to black
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'black', // Set grid lines to black
                lineWidth: 2,   // Increase thickness of grid lines
              },
              ticks: {
                font: {
                  weight: 'bold', // Make axis labels bold
                  size: 14
                },
                color: 'black' // Set axis labels color to black
              },
              border: {
                color: 'black', // Set axis line to black
                width: 3        // Increase thickness of axis line
              }
            },
            y: {
              grid: {
                color: 'black', // Set grid lines to black
                lineWidth: 2,   // Increase thickness of grid lines
              },
              ticks: {
                font: {
                  weight: 'bold', // Make axis labels bold
                  size: 14
                },
                color: 'black' // Set axis labels color to black
              },
              border: {
                color: 'black', // Set axis line to black
                width: 3        // Increase thickness of axis line
              }
            }
          }
        }}
      />
    </div>
  );
}

export default LineChart;