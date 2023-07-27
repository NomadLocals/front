import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../Redux trad/actions";
import { useUser } from "@clerk/clerk-react";

const UsersChart = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user.id));
    }
  }, [dispatch]);

  const dailyUserCount = {};
  if (users) {
    users.forEach((user) => {
      const date = new Date(user.createdAt).toISOString().split("T")[0];
      dailyUserCount[date] = (dailyUserCount[date] || 0) + 1;
    });
  }

  const dataPoints = Object.entries(dailyUserCount).map(
    ([date, userCount]) => ({
      x: date,
      y: userCount,
    })
  );

  const chartData = {
    series: [
      {
        name: "User Count",
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
        text: "User Registrations per Day",
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
        type: "datetime", // Use this if you want to display dates as labels
        categories: dataPoints.map((dataPoint) => dataPoint.x), // Use this if you want to display dates as labels
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "User Count",
        },
        min: 0,
        max: Math.max(...dataPoints.map((dataPoint) => dataPoint.y)) + 1, // Adjust the maximum of the y-axis to show all points correctly
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
