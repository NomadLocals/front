import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetActivities } from "../../../Redux trad/actions";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";

const EventsChart = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(adminGetActivities());
  }, [dispatch]);

  const processDataForChart = (activities) => {
    const activityTypes = {};
    const categories = [];

    activities.forEach((activity) => {
      const date = format(new Date(activity.eventDate), "MM/dd/yyyy");

      if (!activityTypes[activity.activityType]) {
        activityTypes[activity.activityType] = {};
      }

      if (!activityTypes[activity.activityType][date]) {
        activityTypes[activity.activityType][date] = 1;
      } else {
        activityTypes[activity.activityType][date]++;
      }

      if (!categories.includes(date)) {
        categories.push(date);
      }
    });

    const series = Object.keys(activityTypes).map((activityType) => {
      const data = categories.map(
        (date) => activityTypes[activityType][date] || 0
      );
      return {
        name: activityType,
        data: data,
      };
    });

    return { series, categories };
  };

  const [chartData, setChartData] = useState({
    series: [],
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
        categories: [], // This will be updated based on the processed data
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

  useEffect(() => {
    if (activities && activities.length > 0) {
      const { series, categories } = processDataForChart(activities);
      setChartData((prevChartData) => ({
        ...prevChartData,
        series,
        options: {
          ...prevChartData.options,
          xaxis: {
            ...prevChartData.options.xaxis,
            categories,
          },
        },
      }));
    }
  }, [activities]);

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
