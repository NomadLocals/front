import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const UsersChart = () => {
  const dailyLogins = useSelector((state) => state.dailyLogins);

  const dates = Object.keys(dailyLogins);
  console.log(dates);
  const loginsData = Object.values(dailyLogins);
  console.log(loginsData);

  // Crear un array de objetos con la estructura { x: fecha, y: cantidad de logins }
  const dataPoints = Object.entries(dailyLogins).map(([date, logins]) => ({
    x: date,
    y: logins,
  }));

  const chartData = {
    series: [
      {
        name: "Logins",
        data: dataPoints,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: dates,
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Logins",
        },
        min: 0,
        max: Math.max(...loginsData) + 1, // Ajusta el mÃ¡ximo del eje y para mostrar todos los puntos correctamente
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default UsersChart;
