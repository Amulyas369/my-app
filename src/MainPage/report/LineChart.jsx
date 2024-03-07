import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = ({ data, labels, backgroundColors, borderColors }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Brand Distribution",
        data,
        fill: false,
        backgroundColor: backgroundColors[0], // Use the first color for the line
        borderColor: borderColors[0], // Use the first color for the line border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

// Define PropTypes
LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LineChart;
