import React, { useState } from 'react'
import Chart from 'react-apexcharts'
// const GroupedCurrentPrevious = () => {


//     // Example data points, 3 data items in current group and previous group
//     // Each series represents a data point, with data for Current and Previous 
//     const series = [
//         {
//             name: "Data 1",
//             data: [44, 35], // [current, previous]
//         },
//         {
//             name: "Data 2",
//             data: [55, 41],
//         },
//         {   
//             name: "Data 3",
//             data: [41, 36],
//         },
//     ];

//     const options = {
//         chart: {
//             type: "bar",
//             stacked: false,
//             toolbar: { show: true },
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: "45%",
//                 distributed: false,
//                 endingShape: "rounded",
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: ["transparent"],
//         },
//         xaxis: {
//             categories: ["Current", "Previous"], // two main groups
//             title: {
//                 text: "Group",
//                 style: {
//                     fontWeight: 600,
//                     fontSize: '14px',
//                 }
//             }
//         },
//         yaxis: {
//             title: {
//                 text: "Values",
//                 style: {
//                     fontWeight: 600,
//                     fontSize: '14px',
//                 }
//             }
//         },
//         colors: ["#008FFB", "#00E396", "#FEB019"], // unique color per data point across groups
//         legend: {
//             position: "top",
//             horizontalAlign: "center",
//             offsetY: 0,
//             fontSize: '14px',
//         },
//         tooltip: {
//             shared: true,
//             intersect: false,
//             y: {
//                 formatter: function (val) {
//                     return val;
//                 }
//             }
//         }
//     };





//     return (
//         <div style={{ maxWidth: 700, margin: "35px auto" }}>
//             <h2 style={{ textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//                 Current vs Previous Grouped Bar Chart
//             </h2>
//             <Chart options={options} series={series} type="bar" height={400} />
//         </div>
//     )
// }
// export default GroupedCurrentPrevious

// const GroupedCurrentPrevious = () => {
//   // Months
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

//   // Example data for Current and Previous months
//   const currentData = [44, 55, 41, 67, 22, 43];
//   const previousData = [35, 41, 36, 26, 45, 48];

//   // State to switch view: 'both', 'current', 'previous'
//   const [view, setView] = useState("both");

//   // Prepare chart data and colors based on selected view
//   let categories = [];
//   let series = [];
//   let colors = [];

//   if (view === "both") {
//     // Both groups with extra space in between
//     categories = [...months, " ", ...months];
//     series = [
//       {
//         name: "Current",
//         data: [...currentData, 0, ...Array(previousData.length).fill(0)],
//       },
//       {
//         name: "Previous",
//         data: [...Array(currentData.length).fill(0), 0, ...previousData],
//       },
//     ];
//     colors = ["#008FFB", "#FF4560"]; // Blue, Red
//   } else if (view === "current") {
//     // Only current data and categories
//     categories = [...months];
//     series = [
//       {
//         name: "Current",
//         data: [...currentData],
//       },
//     ];
//     colors = ["#008FFB"]; // Blue
//   } else if (view === "previous") {
//     // Only previous data and categories
//     categories = [...months];
//     series = [
//       {
//         name: "Previous",
//         data: [...previousData],
//       },
//     ];
//     colors = ["#FF4560"]; // Red
//   }

//   const options = {
//     chart: {
//       type: "bar",
//       stacked: false,
//       toolbar: { show: true },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "45%",
//         distributed: false,
//         endingShape: "rounded",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories,
//       labels: {
//         rotate: -45,
//         hideOverlappingLabels: false,
//         style: {
//           fontSize: "12px",
//           fontWeight: 600,
//         },
//         formatter: function (val) {
//           return val === "" ? "" : val;
//         },
//       },
//       title: {
//         text: view === "both" ? "Months (Current and Previous Groups)" : "Months",
//         style: {
//           fontWeight: 600,
//           fontSize: "14px",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Values",
//         style: {
//           fontWeight: 600,
//           fontSize: "14px",
//         },
//       },
//     },
//     colors: colors,
//     legend: {
//       position: "top",
//       horizontalAlign: "center",
//       fontSize: "14px",
//       show: view === "both", // show legend only if both groups
//     },
//     tooltip: {
//       shared: false,
//       intersect: true,
//       y: {
//         formatter: (val) => val,
//       },
//     },
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "35px auto" }}>
//       <h2
//         style={{
//           textAlign: "center",
//           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         }}
//       >
//         Month-wise Grouped Bar Chart: Current and Previous
//       </h2>

//       <div style={{ marginBottom: 20, textAlign: "center" }}>
//         <button
//           onClick={() => setView("both")}
//           style={{
//             marginRight: 8,
//             padding: "8px 16px",
//             backgroundColor: view === "both" ? "#008FFB" : "#ddd",
//             border: "none",
//             borderRadius: 4,
//             color: view === "both" ? "#fff" : "#333",
//             cursor: "pointer",
//           }}
//         >
//           Show Both
//         </button>
//         <button
//           onClick={() => setView("current")}
//           style={{
//             marginRight: 8,
//             padding: "8px 16px",
//             backgroundColor: view === "current" ? "#008FFB" : "#ddd",
//             border: "none",
//             borderRadius: 4,
//             color: view === "current" ? "#fff" : "#333",
//             cursor: "pointer",
//           }}
//         >
//           Show Current
//         </button>
//         <button
//           onClick={() => setView("previous")}
//           style={{
//             padding: "8px 16px",
//             backgroundColor: view === "previous" ? "#FF4560" : "#ddd",
//             border: "none",
//             borderRadius: 4,
//             color: view === "previous" ? "#fff" : "#333",
//             cursor: "pointer",
//           }}
//         >
//           Show Previous
//         </button>
//       </div>

//       <Chart options={options} series={series} type="bar" height={450} />

//       {view === "both" && (
//         <div
//           style={{
//             marginTop: 20,
//             textAlign: "center",
//             fontStyle: "italic",
//             fontSize: "13px",
//             color: "#666",
//           }}
//         >
//           Left group months: Current data, &nbsp;&nbsp; Right group months: Previous data
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroupedCurrentPrevious;


const GroupedCurrentPrevious = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "oct"];
    const currentData = [44, 55, 41, 67, 22, 43,54];
    const previousData = [35, 41, 36, 26, 45, 48];
    const [view, setView] = useState("both");

    let categories = [];
    let series = [];
    let colors = [];

    if (view === "both") {
        // Duplicate months for Current and Previous groups with a spacer
        categories = [...months, "", ...months];

        series = [
            {
                name: "Current",
                data: [
                    ...currentData,
                    null, // spacer
                    ...previousData.map(() => null), // hide bars in Previous group
                ],
            },
            {
                name: "Previous",
                data: [
                    ...currentData.map(() => null), // hide bars in Current group
                    null, // spacer
                    ...previousData,
                ],
            },
        ];

        colors = ["#008FFB", "#FF4560"];
    } else if (view === "current") {
        categories = [...months];
        series = [
            {
                name: "Current",
                data: [...currentData],
            },
        ];
        colors = ["#008FFB"];
    } else if (view === "previous") {
        categories = [...months];
        series = [
            {
                name: "Previous",
                data: [...previousData],
            },
        ];
        colors = ["#FF4560"];
    }

    const options = {
        chart: {
            type: "bar",
            stacked: false,
            toolbar: { show: true },
            background: '#f4f4f4',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: "45%",
                endingShape: "rounded",
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories,
            labels: {
                rotate: -45,
                style: {
                    fontSize: "12px",
                    fontWeight: 600,
                },
                formatter: (val) => (val === "" ? "" : val),
            },
            title: {
                text: view === "both" ? "Months (Current and Previous Groups)" : "Months",
                style: {
                    fontWeight: 600,
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            title: {
                text: "Values",
                style: {
                    fontWeight: 600,
                    fontSize: "14px",
                },
            },
        },
        colors,
        legend: {
            position: "top",
            horizontalAlign: "center",
            fontSize: "14px",
            show: view === "both",
        },
        tooltip: {
            shared: false,
            intersect: true,
            y: {
                formatter: (val) => val,
            },
        },
    };

    return (
        <div style={{ maxWidth: 900, margin: "35px auto" }}>
            <h2
                style={{
                    textAlign: "center",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
            >
                Month-wise Grouped Bar Chart: Current and Previous
            </h2>

            <div style={{ marginBottom: 20, textAlign: "center" }}>
                <button
                    onClick={() => setView("both")}
                    style={{
                        marginRight: 8,
                        padding: "8px 16px",
                        backgroundColor: view === "both" ? "#008FFB" : "#ddd",
                        border: "none",
                        borderRadius: 4,
                        color: view === "both" ? "#fff" : "#333",
                        cursor: "pointer",
                    }}
                >
                    Show Both
                </button>
                <button
                    onClick={() => setView("current")}
                    style={{
                        marginRight: 8,
                        padding: "8px 16px",
                        backgroundColor: view === "current" ? "#008FFB" : "#ddd",
                        border: "none",
                        borderRadius: 4,
                        color: view === "current" ? "#fff" : "#333",
                        cursor: "pointer",
                    }}
                >
                    Show Current
                </button>
                <button
                    onClick={() => setView("previous")}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: view === "previous" ? "#FF4560" : "#ddd",
                        border: "none",
                        borderRadius: 4,
                        color: view === "previous" ? "#fff" : "#333",
                        cursor: "pointer",
                    }}
                >
                    Show Previous
                </button>
            </div>

            <Chart options={options} series={series} type="bar" height={450} width={1100} />

            {view === "both" && (
                <div
                    style={{
                        marginTop: 20,
                        textAlign: "center",
                        fontStyle: "italic",
                        fontSize: "13px",
                        color: "#666",
                    }}
                >
                    Left group months: Current data, &nbsp;&nbsp; Right group months: Previous data
                </div>
            )}
        </div>
    );
};

export default GroupedCurrentPrevious;
