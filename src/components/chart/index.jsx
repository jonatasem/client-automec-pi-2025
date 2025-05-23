import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  animator,
} from "chart.js";
import useDashboardData from "../../hooks/useDashboardData";
import "./index.scss";
import Loading from "../loading";

// Registre os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardChart = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = {
    labels: ["Vendas", "Clientes", "Produtos"], // Gráfico para 3 métricas
    datasets: [
      {
        label: "Contagem",
        data: [data.salesCount, data.clientsCount, data.productsCount],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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

  return (
    <div className="container-chart">
      <Bar data={chartData} options={options} className="chart" />
    </div>
  );
};

export default DashboardChart;
