import ReactApexChart from "react-apexcharts";
import React, { useEffect } from "react";

//traer los datos de todos los eventos y editar esos array!
const EventsChart = () => {
  const [chartData, setChartData] = React.useState({
    series: [
      {
        name: "Teatro, cine y show",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Conciertos",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Al aire libre",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "Deportes de equipo",
        data: [21, 7, 25, 13, 22, 8],
      },
      {
        name: "Deportes",
        data: [21, 7, 25, 13, 22, 8],
      },
      {
        name: "Restaurantes y cafes",
        data: [21, 7, 25, 13, 22, 8],
      },
      {
        name: "Otros",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default EventsChart;
