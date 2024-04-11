import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const PieChartTotal = () => {
  const chartContainer = useRef(null);
  const [totalEarning, setTotalEarning] = useState(1000000); // Total month earning
  const [totalSalary, setTotalSalary] = useState(null); // Total salary obtained from API
  const extraCost = 500000; // Extra cost

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cid = getCIDFromLocalStorage();
        const response = await fetch(`http://localhost:3001/total-salary?cid=${cid}`);
        const data = await response.json();
        if (data.success) {
          setTotalSalary(data.totalSalary);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && totalSalary !== null) {
      const profit = totalEarning - totalSalary - extraCost;

      const ctx = chartContainer.current.getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ['Total Salary', 'Extra Cost', 'Profit'],
          datasets: [{
            data: [totalSalary, extraCost, profit],
            backgroundColor: [
              "#75C9E6", // Total Salary
              "#FFDFA6", // Extra Cost
              "#FFFBDD" // Profit
            ],
            borderColor: [
              "#75C9E6",
              "#FFDFA6",
              "#FFFBDD"
            ],
            borderWidth: 1,
          }]
        },
        options: {
          // Additional options for the chart
        },
      });
    }
  }, [totalSalary]);

  const getCIDFromLocalStorage = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users'));
      if (users && users.cid) {
        return users.cid;
      } else {
        throw new Error('CID not found in localStorage');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve CID from localStorage');
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <canvas ref={chartContainer} style={{ display: 'block', width: '100%', height: '30px' }} />
    </div>
  );
};

export default PieChartTotal;
