import React, { useState, useCallback } from 'react';
import ApexChart from 'react-apexcharts';
import { groupActivities } from '../inputDemo';
import { realInput } from '../inputDemo';
const hierarchicalData = {
  2020: {
    data: { netProfit: 2400, revenue: 100, freeCashFlow: 7 },
    months: {
      Jan: {
        weeks: {
          'W1': { days: { 'a': 2, 'b': 2, 'c': 2, "d":20} },
          'W2': { days: { 'a': 10, 'b': 5, 'c': 7 } },
          'W3': { days: { 'a': 6, 'b': 7, 'c': 5 } },
          'W4': { days: { 'a': 8, 'b': 7, 'c': 5 } }
        },
        data: { netProfit: 200, revenue: 350, freeCashFlow: 150 }
      },
      Feb: {
        weeks: {
          'W1': { days: { '1': 7, '2': 8, '3': 9 } },
          'W2': { days: { '4': 6, '5': 7, '6': 8 } },
          'W3': { days: { '7': 5, '8': 6, '9': 7 } },
          'W4': { days: { '10': 8, '11': 9, '12': 10 } }
        },
        data: { netProfit: 2200, revenue: 370, freeCashFlow: 170 }
      }
      // Add more months as needed
    },
  },
  2021: {
    data: { netProfit: 2600, revenue: 4800, freeCashFlow: 1900 },
    months: {
      Jan: {
        weeks: {
          'W1': { days: { '1': 10, '2': 12, '3': 11, '4': 13 } },
          'W2': { days: { '5': 14, '6': 12, '7': 15 } },
          'W3': { days: { '8': 9, '9': 10, '10': 11 } },
          'W4': { days: { '11': 13, '12': 15, '13': 14 } }
        },
        data: { netProfit: 250, revenue: 400, freeCashFlow: 200 }
      },
      Feb: {
        weeks: {
          'W1': { days: { '1': 13, '2': 15, '3': 14 } },
          'W2': { days: { '4': 14, '5': 13, '6': 16 } },
          'W3': { days: { '7': 12, '8': 13, '9': 15 } },
          'W4': { days: { '10': 14, '11': 15, '12': 16 } }
        },
        data: { netProfit: 270, revenue: 430, freeCashFlow: 210 }
      }
      // Add more months as needed
    },
   
  },
  // Add more years as needed
};

const aggregateYearData = (dataObj) => {
  // Aggregate year level data from months if not present explicitly
  // In this example data, year data is precomputed, so just reading it.
  return {
    netProfit: dataObj.data.netProfit,
    revenue: dataObj.data.revenue,
    freeCashFlow: dataObj.data.freeCashFlow,
  };
};

const aggregateMonthData = (months) => {
  const netProfit = [];
  const revenue = [];
  const freeCashFlow = [];
  const categories = Object.keys(months);
  for (let month of categories) {
    netProfit.push(months[month].data.netProfit);
    revenue.push(months[month].data.revenue);
    freeCashFlow.push(months[month].data.freeCashFlow);
  }
  return { netProfit, revenue, freeCashFlow, categories };
};

const aggregateWeekData = (weeks) => {
  const netProfit = [];
  const revenue = []; // For weeks revenue data is not given. We can simulate or ignore.
  const freeCashFlow = [];
  const categories = Object.keys(weeks);
  for (let week of categories) {
    // Aggregate week data by summing days for example
    const days = weeks[week].days;
    // Sum day data for each metric separately, but we only have day values (assuming netProfit)
    // For simplicity, consider day values as only netProfit, generate mock revenue and cashFlow by proportions
    const netProfitSum = Object.values(days).reduce((a, b) => a + b, 0);
    netProfit.push(netProfitSum);
    revenue.push(Math.round(netProfitSum * 1.7)); // approximate revenue
    freeCashFlow.push(Math.round(netProfitSum * 0.6)); // approximate cashflow
  }
  return { netProfit, revenue, freeCashFlow, categories };
};

const aggregateDayData = (days) => {
  const netProfit = [];
  const revenue = [];
  const freeCashFlow = [];
  const categories = Object.keys(days);
  for (let day of categories) {
    const val = days[day];
    netProfit.push(val);
    revenue.push(Math.round(val * 1.7));
    freeCashFlow.push(Math.round(val * 0.6));
  }
  return { netProfit, revenue, freeCashFlow, categories };
};

const prepareSeriesAndOptions = (netProfit, revenue, freeCashFlow, categories) => {
  return {
    series: [
      { name: ' Profit', data: netProfit },
      { name: 'Revenue', data: revenue },
      { name: 'Free Cash Flow', data: freeCashFlow },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 400,
        background: '#fff',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            // This will be handled in React component event handler
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
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
          formatter: (val) => "" + val,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: { height: 320 },
          plotOptions: { bar: { columnWidth: '80%' } },
        },
      }],
    },
  };
};

const Graph = () => {
  // Track drill level: 'year' | 'month' | 'week' | 'day'
  const [drillLevel, setDrillLevel] = useState('year');

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const groupedOutput = groupActivities(realInput);
  // Helper to get chart data based on current drill level and selected hierarchy
  const getChartData = useCallback(() => {
    if (drillLevel === 'year') {
      // Aggregate year level data from hierarchicalData
      const years = Object.keys(hierarchicalData);
      console.log(typeof years,years);
      
      const netProfit = [];
      const revenue = [];
      const freeCashFlow = [];
      for (let year of years) {
        const yrData = aggregateYearData(hierarchicalData[year]);
        netProfit.push(yrData.netProfit);
        revenue.push(yrData.revenue);
        freeCashFlow.push(yrData.freeCashFlow);
      }
      return prepareSeriesAndOptions(netProfit, revenue, freeCashFlow, years);
    }
    else if (drillLevel === 'month' && selectedYear) {
      const monthsData = hierarchicalData[selectedYear]?.months;
      if (!monthsData) return null;
      const { netProfit, revenue, freeCashFlow, categories } = aggregateMonthData(monthsData);
      return prepareSeriesAndOptions(netProfit, revenue, freeCashFlow, categories);
    }
    else if (drillLevel === 'week' && selectedYear && selectedMonth) {
      const weeksData = hierarchicalData[selectedYear]?.months[selectedMonth]?.weeks;
      if (!weeksData) return null;
      const { netProfit, revenue, freeCashFlow, categories } = aggregateWeekData(weeksData);
      return prepareSeriesAndOptions(netProfit, revenue, freeCashFlow, categories);
    }
    else if (drillLevel === 'day' && selectedYear && selectedMonth && selectedWeek) {
      const daysData = hierarchicalData[selectedYear]?.months[selectedMonth]?.weeks[selectedWeek]?.days;
      if (!daysData) return null;
      const { netProfit, revenue, freeCashFlow, categories } = aggregateDayData(daysData);
      return prepareSeriesAndOptions(netProfit, revenue, freeCashFlow, categories);
    }
    return null;
  }, [drillLevel, selectedYear, selectedMonth, selectedWeek]);

  const chartData = getChartData();

  // Handling bar click - drill down
  const handleDataPointSelection = (event, chartContext, config) => {
    if (!config.w || config.w.config.xaxis.categories.length === 0) return;
    const clickedIndex = config.dataPointIndex;
    const clickedCategory = config.w.config.xaxis.categories[clickedIndex];

    if (drillLevel === 'year') {
      setSelectedYear(clickedCategory);
      setDrillLevel('month');
      setSelectedMonth(null);
      setSelectedWeek(null);
    } else if (drillLevel === 'month') {
      setSelectedMonth(clickedCategory);
      setDrillLevel('week');
      setSelectedWeek(null);
    } else if (drillLevel === 'week') {
      setSelectedWeek(clickedCategory);
      setDrillLevel('day');
    }
    // at day level do nothing on click (or alternatively reset)
  };

  // Handle going back up one level
  const handleDrillUp = () => {
    if (drillLevel === 'day') {
      setDrillLevel('week');
      setSelectedWeek(null);
    } else if (drillLevel === 'week') {
      setDrillLevel('month');
      setSelectedMonth(null);
    } else if (drillLevel === 'month') {
      setDrillLevel('year');
      setSelectedYear(null);
    }
  };

  if (!chartData) {
    return <div>No data available for selected selection.</div>;
  }


  console.log(JSON.stringify(groupedOutput, null, 2));
  return (
    <div style={{ maxWidth: '900px', margin: 'auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', color: '#34495e', marginBottom: 20 }}>
        Drill-down Bar Chart - {drillLevel.charAt(0).toUpperCase() + drillLevel.slice(1)} Level
      </h2>

      {/* Breadcrumb/Path info and Back button */}
      <div style={{ marginBottom: 20, fontSize: 16 }}>
        <button
          onClick={handleDrillUp}
          disabled={drillLevel === 'year'}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: drillLevel === 'year' ? '#ccc' : '#3498db',
            color: '#fff',
            cursor: drillLevel === 'year' ? 'not-allowed' : 'pointer',
            marginRight: 10,
          }}>
          Back
        </button>
        Path:
        {' '}
        <strong>{selectedYear || 'All Years'}</strong>
        {selectedMonth && <> &gt; <strong>{selectedMonth}</strong></>}
        {selectedWeek && <> &gt; <strong>{selectedWeek}</strong></>}
      </div>

      <ApexChart
        options={{
          ...chartData.options,
          chart: {
            ...chartData.options.chart,
            events: {
              dataPointSelection: handleDataPointSelection,
            },
          },
        }}
        series={chartData.series}
        type="bar"
        height={400}
        width={980}
      />
    </div>
  );
};

export default Graph;

