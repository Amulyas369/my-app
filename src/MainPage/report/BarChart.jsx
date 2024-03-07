import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import PropTypes from "prop-types"; // Import PropTypes for props validation

const BarChart = ({ data, labels, backgroundColors, borderColors }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Brand Distribution",
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Set to true if you want to display the label
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

// PropTypes validation
BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarChart;
