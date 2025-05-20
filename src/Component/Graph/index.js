import React, { useState, useMemo } from 'react';
import ApexChart from 'react-apexcharts';
import { groupActivities, groupActivitiesFullDate, groupActivitiesFullDateSorted, realInput } from '../inputDemo';

const inputData = {
  "2024": {
    "data": {
      "enemy_orbat": 5,
      "joint_exercise": 2,
      "miscellaneous": 3,
      "equipment": 4,
      "dynamic_activity": 2,
      "deployment": 2
    },
    "may": {
      "data": {
        "enemy_orbat": 3,
        "equipment": 4,
        "dynamic_activity": 2
      },
      "weak": {
        "W1": {
          "days": {
            "5": {
              "dynamic_activity": 2
            },
            "6": {
              "enemy_orbat": 3
            }
          }
        },
        "W3": {
          "days": {
            "16": {
              "equipment": 2
            },
            "17": {
              "equipment": 2
            }
          }
        }
      }
    },
    "march": {
      "data": {
        "joint_exercise": 2,
        "enemy_orbat": 2,
        "miscellaneous": 3
      },
      "weak": {
        "W2": {
          "days": {
            "8": {
              "joint_exercise": 2
            }
          }
        },
        "W3": {
          "days": {
            "19": {
              "enemy_orbat": 2
            },
            "20": {
              "miscellaneous": 1
            }
          }
        },
        "W4": {
          "days": {
            "23": {
              "miscellaneous": 2
            }
          }
        }
      }
    },
    "april": {
      "data": {
        "deployment": 2
      },
      "weak": {
        "W3": {
          "days": {
            "21": {
              "deployment": 2
            }
          }
        }
      }
    }
  },
  "2025": {
    "data": {
      "enemy_orbat": 5,
      "joint_exercise": 2,
      "miscellaneous": 5,
      "equipment": 4,
      "dynamic_activity": 2,
      "deployment": 2
    },
    "may": {
      "data": {
        "enemy_orbat": 3,
        "equipment": 4,
        "dynamic_activity": 2
      },
      "weak": {
        "W1": {
          "days": {
            "5": {
              "dynamic_activity": 2
            },
            "6": {
              "enemy_orbat": 3
            }
          }
        },
        "W3": {
          "days": {
            "16": {
              "equipment": 2
            },
            "17": {
              "equipment": 2
            }
          }
        }
      }
    },
    "march": {
      "data": {
        "joint_exercise": 2,
        "enemy_orbat": 2,
        "miscellaneous": 5
      },
      "weak": {
        "W2": {
          "days": {
            "8": {
              "joint_exercise": 2
            }
          }
        },
        "W3": {
          "days": {
            "19": {
              "enemy_orbat": 2
            },
            "20": {
              "miscellaneous": 3
            }
          }
        },
        "W4": {
          "days": {
            "23": {
              "miscellaneous": 2
            }
          }
        }
      }
    },
    "april": {
      "data": {
        "deployment": 2
      },
      "weak": {
        "W3": {
          "days": {
            "21": {
              "deployment": 2
            }
          }
        }
      }
    }
  }
};

// Helper to get all unique activity types recursively in dataset
function getAllActivityTypes(data) {
  const activities = new Set();

  function recurse(obj) {
    if (obj && typeof obj === 'object') {
      if (obj.data) {
        Object.keys(obj.data).forEach(act => activities.add(act));
      }
      if (obj.weak) {
        Object.values(obj.weak).forEach(wk => {
          if (wk.days) {
            Object.values(wk.days).forEach(dayObj => {
              Object.keys(dayObj).forEach(act => activities.add(act));
            });
          }
        });
      }
      // recurse all children keys except 'data' and 'weak'
      Object.entries(obj).forEach(([k,v]) => {
        if (k !== 'data' && k !== 'weak') {
          recurse(v);
        }
      });
    }
  }

  recurse(data);
  return Array.from(activities);
}
const groupedFormation = await groupActivitiesFullDateSorted(realInput)
console.log(groupedFormation);

const activityTypes = getAllActivityTypes(groupedFormation);

// Helper to construct series data for chart given data slice and activities
function buildSeriesFromData(dataObj, activities) {
  // dataObj is expected to have `data` key or be a mapping of activity counts
  const result = activities.map(activity => {
    const count = dataObj?.data?.[activity] ?? (dataObj?.[activity] ?? 0);
    return count;
  });
  return result;
}

// Main component
export default function Graph() {
  // State for drill down: level ('year','month','week','day') and selected keys along the drill path
  const [drill, setDrill] = useState({
    level: 'year',
    year: null,
    month: null,
    week: null
  });

  // Helper: get keys like years, months, weeks, days for category axis depending on level
  function getCategories(level, context) {
    if (level === 'year') {
      return Object.keys(groupedFormation).sort();
    }
    if (level === 'month') {
      const months = groupedFormation[context.year];
      if (!months) return [];
      return Object.keys(months)
        .filter(k => k !== 'data' && k !== 'weak')
        .sort((a,b) => new Date(`${a} 1, 2000`) - new Date(`${b} 1, 2000`));
    }
    if (level === 'week') {
      const weeks = groupedFormation[context.year]?.[context.month]?.weak;
      if (!weeks) return [];
      return Object.keys(weeks).sort();
    }
    if (level === 'day') {
      const daysObj = groupedFormation[context.year]?.[context.month]?.weak?.[context.week]?.days;
      if (!daysObj) return [];
      // Day keys as numbers sorted
      return Object.keys(daysObj).sort((a,b) => parseInt(a) - parseInt(b));
    }
    return [];
  }

  // Build series data for current drill level and context
  function buildSeries(level, context) {
    const categories = getCategories(level, context);
    const series = activityTypes.map(activity => {
      const data = categories.map(cat => {
        // Depending on level, look up counts
        switch (level) {
          case 'year':
            return groupedFormation[cat]?.data?.[activity] ?? 0;
          case 'month':
            return groupedFormation[context.year]?.[cat]?.data?.[activity] ?? 0;
          case 'week':
            return groupedFormation[context.year]?.[context.month]?.weak?.[cat]?.days
              ? Object.values(groupedFormation[context.year][context.month].weak[cat].days).reduce((acc, dayObj) => acc + (dayObj[activity] ?? 0), 0)
              : 0;
          case 'day':
            return groupedFormation[context.year]?.[context.month]?.weak?.[context.week]?.days?.[cat]?.[activity] ?? 0;
          default:
            return 0;
        }
      });
      return {
        name: activity,
        data
      };
    });
    return series;
  }

  // Current categories and series for the chart depending on drill state
  const categories = useMemo(() => {
    return getCategories(drill.level, drill);
  }, [drill]);

  const series = useMemo(() => {
    return buildSeries(drill.level, drill);
  }, [drill]);

  // Handle clicking on a bar to drill down deeper
  function handleDataPointSelection(event, chartContext, config) {
    const pointIndex = config.dataPointIndex;
    if (pointIndex === -1) return; // no selection
    if (drill.level === 'year') {
      const selectedYear = categories[pointIndex];
      setDrill({ level: 'month', year: selectedYear, month: null, week: null });
    } else if (drill.level === 'month') {
      const selectedMonth = categories[pointIndex];
      setDrill({ level: 'week', year: drill.year, month: selectedMonth, week: null });
    } else if (drill.level === 'week') {
      const selectedWeek = categories[pointIndex];
      setDrill({ level: 'day', year: drill.year, month: drill.month, week: selectedWeek });
    }
    // At 'day' level, cannot drill further
  }

  // Go back up one level
  function handleBack() {
    if (drill.level === 'day') {
      setDrill({ level: 'week', year: drill.year, month: drill.month, week: null });
    } else if (drill.level === 'week') {
      setDrill({ level: 'month', year: drill.year, month: null, week: null });
    } else if (drill.level === 'month') {
      setDrill({ level: 'year', year: null, month: null, week: null });
    }
  }

  // Display current drill level text for user context
  const drillLabel = {
    year: 'Year',
    month: `Months in ${drill.year}`,
    week: `Weeks in ${drill.month} ${drill.year}`,
    day: `Days in ${drill.week} of ${drill.month} ${drill.year}`
  }[drill.level];

  // Chart options
  const chartOptions = {
    chart: {
        background: '#f4f4f4',
      type: 'bar',
      height: 350,
      events: {
        dataPointSelection: handleDataPointSelection
      }
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
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Count',
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: val => `${val} count${val !== 1 ? 's' : ''}`
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 0
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Activity Counts by {drillLabel}</h2>
      {(drill.level !== 'year') && (
        <button
          onClick={handleBack}
          style={{
            marginBottom: 12,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          &larr; Back
        </button>
      )}
      <ApexChart
        options={chartOptions}
        series={series}
        type="bar"
        height={400}
        width={1100}
      />
    </div>
  );
}

