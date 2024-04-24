"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { GraphData } from "@/@types";
import { NextPage } from "next";

interface BarGraphProps {
  data: GraphData[];
}

export const BarGraph: NextPage<BarGraphProps> = ({ data }) => {
  if (!data.length) return null;

  const labels = data.map((item) => item.day);
  const amounts = data.map((item) => item.totalAmount / 100);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Montant des ventes",
        data: amounts,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
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
  };

  return <Bar data={chartData} options={options} />;
};
