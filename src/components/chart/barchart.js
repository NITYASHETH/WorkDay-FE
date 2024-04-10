import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartContainer = useRef(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCid = getUserByCid();
        const response = await fetch(`http://localhost:3001/users-timings?cid=${userCid}`);
        const data = await response.json();
        if (data.status === 1) {
          setUserData(data.all_users_timings);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getUserByCid = () => {
      const userDataString = localStorage.getItem("users");
      const userData = JSON.parse(userDataString);
      return userData.cid;
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && userData.length > 0) {
      const ctx = chartContainer.current.getContext("2d");

      const labels = userData.map((user) => user.name);
      const data = userData.map((user) => {
        // Calculate total hours for each user
        const totalHours = user.timings.reduce((acc, timing) => {
          const loginTime = new Date(timing.login_time);
          const logoutTime = new Date(timing.logout_time);
          const hours = (logoutTime - loginTime) / (1000 * 60 * 60); // Convert milliseconds to hours
          return acc + hours;
        }, 0);
        return totalHours;
      });

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Hours',
            data: data,
            backgroundColor: [
              "red",
              "blue",
              "yellow",
              "green",
              "purple",
              "orange",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [userData]);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <canvas ref={chartContainer} style={{ display: 'block', width: '100%', height: '400px' }} />
    </div>
  );
};

export default BarChart;
