import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data, labels, backgroundColors, borderColors }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        // innerHeight: "350px",
        // innerWidth: "350px",
      },
    ],
  };
  return <Pie data={chartData} />;
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PieChart;
