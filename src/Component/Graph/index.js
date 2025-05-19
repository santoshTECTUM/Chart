import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { groupWiseData,drilldownData } from '../inputDemo'

function getChartData(drilldownData, level, path) {
  if (level === "year") {
    const years = Object.keys(drilldownData.year);
    const series = [
      {
        name: "Total",
        data: years.map((year) => drilldownData.year[year].total),
      },
    ];
    return { series, categories: years };
  }

  if (level === "month") {
    const months = Object.keys(drilldownData.year[path.year].months);
    const series = [
      {
        name: "Total",
        data: months.map((month) => drilldownData.year[path.year].months[month].total),
      },
    ];
    return { series, categories: months };
  }

  if (level === "week") {
    const weeks = Object.keys(drilldownData.year[path.year].months[path.month].weeks);
    const series = [
      {
        name: "Total",
        data: weeks.map(
          (week) => drilldownData.year[path.year].months[path.month].weeks[week].total
        ),
      },
    ];
    return { series, categories: weeks };
  }

  if (level === "day") {
    const days = Object.entries(
      drilldownData.year[path.year].months[path.month].weeks[path.week].days
    );
    const series = [
      {
        name: "Total",
        data: days.map(([_, count]) => count),
      },
    ];
    return { series, categories: days.map(([day]) => day) };
  }
}


const Graph = ({name,type}) => {

  const [level, setLevel] = useState("year");
  const [path, setPath] = useState({ year: null, month: null, week: null });

  const { series, categories } = getChartData(drilldownData, level, path);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const label = config.w.config.xaxis.categories[config.dataPointIndex];
          if (level === "year") {
            setPath({ year: label, month: null, week: null });
            setLevel("month");
          } else if (level === "month") {
            setPath((prev) => ({ ...prev, month: label }));
            setLevel("week");
          } else if (level === "week") {
            setPath((prev) => ({ ...prev, week: label }));
            setLevel("day");
          }
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "(Count)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  };

  const handleBack = () => {
    if (level === "day") {
      setLevel("week");
      setPath((prev) => ({ ...prev, week: null }));
    } else if (level === "week") {
      setLevel("month");
      setPath((prev) => ({ ...prev, month: null }));
    } else if (level === "month") {
      setLevel("year");
      setPath({ year: null, month: null, week: null });
    }
  };


  return (
    <>
      <h3>{type}: {name}</h3>
      {level !== 'year' && (
        <button onClick={handleBack} style={{ marginBottom: '10px' }}>
          ← Go Back
        </button>
      )}
      <Chart
        options={groupWiseData.options}
        // series={[{ name: 'Data', data: series }]}
        series={groupWiseData.series}
        type="bar"
        width={985}
        height={400}
      />
    </>
  )
}

export default Graph
