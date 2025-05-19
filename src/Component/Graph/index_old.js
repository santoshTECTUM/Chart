import React, { useState } from 'react';
import ApexChart from 'react-apexcharts';

// Function to generate dynamic chart data for different timeframes
const generateGroupWiseData = (timeFrame) => {
  let series = [];
  let categories = [];

  // Example data for different time frames
  const data = {
    year: {
      series: [
        { name: 'Net Profit', data: [500, 600, 700, 800] },
        { name: 'Revenue', data: [1000, 1200, 1400, 1600] },
        { name: 'Free Cash Flow', data: [300, 400, 500, 600] },
      ],
      categories: ['2020', '2021', '2022', '2023'],
    },
    month: {
      series: [
        { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
        { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
      ],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    week: {
      series: [
        { name: 'Net Profit', data: [10, 20, 30, 40, 50, 60, 70] },
        { name: 'Revenue', data: [15, 25, 35, 45, 55, 65, 75] },
        { name: 'Free Cash Flow', data: [5, 10, 15, 20, 25, 30, 35] },
      ],
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    day: {
      series: [
        { name: 'Net Profit', data: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { name: 'Revenue', data: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { name: 'Free Cash Flow', data: [1, 1, 2, 2, 3, 3, 4, 4, 5] },
      ],
      categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    },
  };

  if (data[timeFrame]) {
    series = data[timeFrame].series;
    categories = data[timeFrame].categories;
  } else {
    console.error('Invalid time frame specified');
    return null;
  }

  return {
    series,
    options: {
      chart: {
        type: 'bar',
        background: '#fff',
        height: 350,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories,
      },
      yaxis: {
        title: {
          text: '(Count)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val;
          },
        },
      },
    },
  };
};

const DynamicApexChart = () => {
  const [timeFrame, setTimeFrame] = useState('month');

  const chartData = generateGroupWiseData(timeFrame);

  if (!chartData) {
    return <div>Invalid time frame selected</div>;
  }

  return (
    <div style={{ maxWidth: '850px', margin: 'auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', color: '#34495e' }}>Dynamic Group Wise Bar Chart</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="timeFrame" style={{ marginRight: '10px', fontWeight: '600' }}>Select Time Frame:</label>
        <select
          id="timeFrame"
          value={timeFrame}
          onChange={e => setTimeFrame(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>

      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
        width={980}
      />
    </div>
  );
};

export default DynamicApexChart;

