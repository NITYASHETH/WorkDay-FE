import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      // Create the chart
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3],
              backgroundColor: ["purple", "blue", "yellow"],
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;
