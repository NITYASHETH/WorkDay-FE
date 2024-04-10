import { useEffect, useState } from "react";
import "./totalEmployeesDisplay.scss"; // Import CSS file for styling

const TotalEmployeesDisplay = () => {
  const [totalEmployees, setTotalEmployees] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/users?role=employee&cid=1')
      .then(response => response.json())
      .then(data => {
        const total = data.length;
        setTotalEmployees(total);
      })
      .catch(error => console.error('Error fetching total employees:', error));
  }, []);

  return (
    <div className="total-employees-display">
      <span className="total-employees">{totalEmployees !== null ? totalEmployees : 'Loading...'}</span>
    </div>
  );
};

export default TotalEmployeesDisplay;
