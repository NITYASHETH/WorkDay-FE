import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [totalEmployees, setTotalEmployees] = useState(null);

  useEffect(() => {
    // Fetch total number of employees from API or database
    // Replace the URL with your actual API endpoint
    fetch("http://localhost:3001/users?role=employee&cid=1")
      .then((response) => response.json())
      .then((data) => {
        // Calculate the total number of employees
        const total = data.length;
        setTotalEmployees(total);
      })
      .catch((error) => console.error("Error fetching total employees:", error));
  }, []);

  return <span>{totalEmployees !== null ? totalEmployees : 'Loading...'}</span>;
};

export default YourComponent;
