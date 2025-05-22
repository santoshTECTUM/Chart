
export const router = [
  {
    url: 'line',
    name: 'Line',
    type: 'line',
    Children: [
      { url: 'basic-line', type: 'line', name: 'Basic Line' },
      { url: 'line-data-labels', type: 'line', name: 'Line Data Labels' },
      { url: 'time-series', type: 'line', name: 'Time Series' },
      { url: 'line-with-annotations', type: 'line', name: 'Line with Annotations' },
      { url: 'sync-charts', type: 'line', name: 'Sync Charts' },
      { url: 'brush-chart', type: 'line', name: 'Brush Chart' },
      { url: 'step-line-chart', type: 'line', name: 'Step Line Chart' },
      { url: 'gradient-line', type: 'line', name: 'Gradient line' },
      { url: 'real-time-chart', type: 'line', name: 'Real Time Chart' },
      { url: 'dashed-line-chart', type: 'line', name: 'Dashed Line Chart' },
    ]
  },
  {
    url: 'area',
    name: 'Area',
    type: 'area',
    Children: [
      { url: 'basic-area', type: 'area', name: 'Basic Area' },
      { url: 'spline-area', type: 'area', name: 'Spline Area' },
      { url: 'date-time-axis', type: 'area', name: 'Date Time a-axis' },
      { url: 'area-with-negative', type: 'area', name: 'Area With Negative Values' },
      { url: 'github-style', type: 'area', name: 'GitHub Style' },
      { url: 'stacked-area', type: 'area', name: 'Stacked Area' },
      { url: 'irregular-timeseries', type: 'area', name: 'Irregular Timeseries' },
      { url: 'area-null', type: 'area', name: 'Area Chart With Null' },
    ]
  },
  {
    url: 'column',
    name: 'Column',
    type: 'column',
    Children: [
      { url: 'basic-column', type: 'column', name: 'Basic Column' },
      { url: 'grouped-stacked', type: 'column', name: 'Grouped Stacked Chart' },
      { url: 'column-annotations', type: 'column', name: 'Column with Annotations' },
      { url: 'dumbbell-chart', type: 'column', name: 'Dumbbell Chart' },
      { url: 'grouped-x-axis', type: 'column', name: 'Grouped x-axis Label' },
      { url: 'rotated-labels', type: 'column', name: 'Column with Rotated Labels' },
      { url: 'negative-values', type: 'column', name: 'Column chart with Negative Values' },
      { url: 'range-column', type: 'column', name: 'Range Column Chart' },
      { url: 'dynamic-loaded', type: 'column', name: 'Dynamic Loaded Chart' },
      { url: 'distributed-column', type: 'column', name: 'Distruted Column Chart' },
    ]
  },
  {
    url: 'mixed',
    name: 'Mixed',
    type: 'mixed',
    Children: [
      { url: 'line-column', type: 'mixed', name: 'Line Column Chart' },
      { url: 'multiple-y-axis', type: 'mixed', name: 'Multiple Y-axis Chart' },
      { url: 'line-area', type: 'mixed', name: 'Line and Area Chart' },
      { url: 'line-column-area', type: 'mixed', name: 'Line column Area Chart' },
    ]
  },
  { url: 'range-area', name: 'Range-Area', type: 'range-area', Children: [] },
  { url: 'timeline-range-bar', name: 'Timeline-Range-Bar', type: 'timeline-range-bar', Children: [] },
  { url: 'funnel', name: 'Funnel', type: 'funnel', Children: [] },
  { url: 'candlestick', name: 'Candle Stick', type: 'candlestick', Children: [] },
  { url: 'box-plot', name: 'Box Plot', type: 'box-plot', Children: [] },
  { url: 'bubble', name: 'Bubble', type: 'bubble', Children: [] },
  { url: 'scatter', name: 'Scatter', type: 'scatter', Children: [] },
  { url: 'heat-map', name: 'Heat Map', type: 'heat-map', Children: [] },
  { url: 'tree-map', name: 'Tree Map', type: 'tree-map', Children: [] },
  { url: 'slope-chart', name: 'Slope Chart', type: 'slope-chart', Children: [] },
  { url: 'pie', name: 'Pie', type: 'pie', Children: [] },
  { url: 'radial-bar', name: 'Radial Bar', type: 'radial-bar', Children: [] },
  { url: 'radar', name: 'Radar', type: 'radar', Children: [] },
  { url: 'polar-area', name: 'Polar Area', type: 'polar-area', Children: [] },
];


export const graphType = {
  line: [
    {
      url: 'basic-line', type: 'line', name: 'Basic Line', options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
      }, series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }]
    },
    { url: 'line-data-labels', type: 'line', name: 'Line Data Labels', series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: "Low - 2013",
        data: [12, 11, 14, 18, 17, 13, 13]
      }
    ],  options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    }
  
  
} ,
    { url: 'time-series', type: 'area', name: 'Time Series' },
    { url: 'line-with-annotations', type: 'line', name: 'Line with Annotations' },
    { url: 'sync-charts', type: 'line', name: 'Sync Charts' },
    { url: 'brush-chart', type: 'line', name: 'Brush Chart' },
    { url: 'step-line-chart', type: 'line', name: 'Step Line Chart' },
    { url: 'gradient-line', type: 'line', name: 'Gradient line' },
    { url: 'real-time-chart', type: 'line', name: 'Real Time Chart' },
    { url: 'dashed-line-chart', type: 'line', name: 'Dashed Line Chart' },],


  area: [
    { url: 'basic-area', type: 'area', name: 'Basic Area' },
    { url: 'spline-area', type: 'area', name: 'Spline Area' },
    { url: 'date-time-axis', type: 'area', name: 'Date Time a-axis' },
    { url: 'area-with-negative', type: 'area', name: 'Area With Negative Values' },
    { url: 'github-style', type: 'area', name: 'GitHub Style' },
    { url: 'stacked-area', type: 'area', name: 'Stacked Area' },
    { url: 'irregular-timeseries', type: 'area', name: 'Irregular Timeseries' },
    { url: 'area-null', type: 'area', name: 'Area Chart With Null' },
  ],

  column: [
    { url: 'basic-column', type: 'column', name: 'Basic Column' },
    { url: 'grouped-stacked', type: 'column', name: 'Grouped Stacked Chart' },
    { url: 'column-annotations', type: 'column', name: 'Column with Annotations' },
    { url: 'dumbbell-chart', type: 'column', name: 'Dumbbell Chart' },
    { url: 'grouped-x-axis', type: 'column', name: 'Grouped x-axis Label' },
    { url: 'rotated-labels', type: 'column', name: 'Column with Rotated Labels' },
    { url: 'negative-values', type: 'column', name: 'Column chart with Negative Values' },
    { url: 'range-column', type: 'column', name: 'Range Column Chart' },
    { url: 'dynamic-loaded', type: 'column', name: 'Dynamic Loaded Chart' },
    { url: 'distributed-column', type: 'column', name: 'Distruted Column Chart' },
  ],

  mixed: [{ url: 'line-column', type: 'mixed', name: 'Line Column Chart' },
  { url: 'multiple-y-axis', type: 'mixed', name: 'Multiple Y-axis Chart' },
  { url: 'line-area', type: 'mixed', name: 'Line and Area Chart' },
  { url: 'line-column-area', type: 'mixed', name: 'Line column Area Chart' },],


  'range-area': [],
  'timeline-range-bar': [],
  funnel: [],
  'candlestick': [],
  'box-plot': [],
  bubble: [],
  scatter: [],
  'heat-map': [],
  'tree-map': [],
  'slope-chart': [],
  pie: [],
  'radial-bar': [],
  'radar': [],
  'polar-area': [],

}