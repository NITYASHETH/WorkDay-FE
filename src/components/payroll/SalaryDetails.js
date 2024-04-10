import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryDetails = () => {
  const [userId, setUserId] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [totalPresentDays, setTotalPresentDays] = useState(0);
  const [totalSalaryForMonth, setTotalSalaryForMonth] = useState(0);
  const [calculatedSalary, setCalculatedSalary] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUserList(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAndSendSalaryDetails = async () => {
    try {
      const response = await axios.post('http://localhost:3001/calculate-and-send-salary-details', { userId, month, year, status });
      const { totalPresentDays, totalSalaryForMonth, calculatedSalary } = response.data;
      setTotalPresentDays(totalPresentDays);
      setTotalSalaryForMonth(totalSalaryForMonth);
      setCalculatedSalary(calculatedSalary);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusClick = async (newStatus) => {
    try {
      // Update status
      await axios.put(`http://localhost:3001/update-status/${userId}`, { status: newStatus });
      setStatus(newStatus); // Assuming successful update, update status locally
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <input type="text" placeholder="Month" value={month} onChange={e => setMonth(e.target.value)} />
      <input type="text" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>
      <button onClick={calculateAndSendSalaryDetails}>Calculate Salary Details</button>
      <div>
        <p>Total Present Days: {totalPresentDays}</p>
        <p>Total Salary For Month: {totalSalaryForMonth}</p>
        <p>Calculated Salary: {calculatedSalary}</p>
        {status !== 'paid' && (
          <button onClick={() => handleStatusClick('paid')}>Mark as Paid</button>
        )}
        {status !== 'unpaid' && (
          <button onClick={() => handleStatusClick('unpaid')}>Mark as Unpaid</button>
        )}
      </div>
      <div>
        <h2>User List with Calculated Salaries</h2>
        <ul>
          {userList.map(user => (
            <li key={user.userId}>{user.fname} - {user.calculatedSalary}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SalaryDetails;
