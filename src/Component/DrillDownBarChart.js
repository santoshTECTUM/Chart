import { type } from '@testing-library/user-event/dist/type'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { demo , outputMain} from './inputDemo.js'

const DrillDownBarChart = () => {
  const [level, setLevel] = useState('year')
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(null)
  // Final sorted output
  const sortedOutput = {};

  function getWeekOfMonth(date) {
    const d = new Date(date);
    const day = d.getDate();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    return Math.ceil((day + firstDay) / 7);
  }

  function getDayIndex(date) {
    return new Date(date).getDay(); // 0 = Sunday
  }

  function getMonthName(index) {
    return new Date(2025, index, 1).toLocaleString('default', { month: 'long' });
  }

  function generateValueFromCoordinate(coord) {
    if (!Array.isArray(coord) || coord.length < 2) return 0;
    return Math.round((coord[0] + coord[1]) * 5 + Math.random() * 10);
  }

  // Main Output Builder
  const tempOutput = {};

  demo.forEach(item => {
    const dateStr = item.created_date;
    const coords = item.coordinates?.[0];
    if (!coords || !dateStr) return;

    const date = new Date(dateStr);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const month = getMonthName(monthIndex);
    const week = `week${getWeekOfMonth(date)}`;
    const dayIndex = getDayIndex(date);
    const value = generateValueFromCoordinate(coords);

    if (!tempOutput[year]) tempOutput[year] = {};
    if (!tempOutput[year][month]) tempOutput[year][month] = {};
    if (!tempOutput[year][month][week]) tempOutput[year][month][week] = new Array(7).fill(null);

    tempOutput[year][month][week][dayIndex] = value;
  });

  // Order months
  const MONTH_ORDER = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  for (const year of Object.keys(tempOutput)) {
    sortedOutput[year] = {};
    const months = Object.keys(tempOutput[year]).sort(
      (a, b) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b)
    );
    for (const month of months) {
      sortedOutput[year][month] = tempOutput[year][month];
    }
  }

  console.log(JSON.stringify(sortedOutput, null, 2));


  const getChartData = () => {
    if (level === 'year') {
      const years = Object.keys(sortedOutput)
      const values = years.map(y => {
        const months = sortedOutput[y]
        let total = 0
        for (let m in months) {
          for (let w in months[m]) {
            total += months[m][w].reduce((a, b) => a + b, 0)
          }
        }
        return total
      })
      return { categories: years, series: values }
    }

    if (level === 'month' && selectedYear) {
      const months = Object.keys(sortedOutput[selectedYear])
      const values = months.map(m => {
        const weeks = sortedOutput[selectedYear][m]
        let total = 0
        for (let w in weeks) {
          total += weeks[w].reduce((a, b) => a + b, 0)
        }
        return total
      })
      return { categories: months, series: values }
    }

    if (level === 'week' && selectedYear && selectedMonth) {
      const weeks = Object.keys(sortedOutput[selectedYear][selectedMonth])
      const values = weeks.map(w =>
        sortedOutput[selectedYear][selectedMonth][w].reduce((a, b) => a + b, 0)
      )
      return { categories: weeks, series: values }
    }

    if (level === 'day' && selectedYear && selectedMonth && selectedWeek) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const values = sortedOutput[selectedYear][selectedMonth][selectedWeek]
      return { categories: days, series: values }
    }


    return { categories: [], series: [] }
  }

  const handleGoBack = () => {
    if (level === 'day') {
      setLevel('week');
      setSelectedWeek(null);
    } else if (level === 'week') {
      setLevel('month');
      setSelectedMonth(null);
    } else if (level === 'month') {
      setLevel('year');
      setSelectedYear(null);
    }
  };

  const handleClick = (event, chartContext, config) => {
    const index = config.dataPointIndex
    const { categories, series } = getChartData()

    console.log('categories:', categories, categories[index], series);

    if (level === 'year') {
      setSelectedYear(categories[index])
      setLevel('month')
    } else if (level === 'month') {
      setSelectedMonth(categories[index])
      setLevel('week')
    } else if (level === 'week') {
      setSelectedWeek(categories[index])
      setLevel('day')
    }
  }

  const { categories, series } = getChartData()
  // console.log('categories:', categories, 'series:', series);


  const options = {
    chart: {
      id: 'drilldown-bar',
      events: {
        dataPointSelection: handleClick
      },
      background: '#fff',
      // foreColor: '#373d3f'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories
    }
  }

  // console.log(output,outputMain);

  return (
    <div>
      <h3>Drilldown Level: {level}</h3>
      {level !== 'year' && (
        <button onClick={handleGoBack} style={{ marginBottom: '10px' }}>
          ← Go Back
        </button>
      )}
      <Chart
        options={options}
        series={[{ name: 'Data', data: series }]}
        type="bar"
        width={600}
        height={400}
      />
    </div>
  )
}

export default DrillDownBarChart
