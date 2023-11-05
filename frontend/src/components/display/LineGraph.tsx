import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type LineGraphTypes = {
  labels: string[];
  dataset: number[];
}

const LineGraph = ({labels, dataset}: LineGraphTypes) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset,
        borderColor: "rgb(0, 240, 5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineGraph;
