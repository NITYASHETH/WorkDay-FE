// PayrollSlip.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PayrollSlip = () => {
  const location = useLocation();
  const { result } = location.state || {};
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!result) {
      setError('No data available.');
    }
  }, [result]);

  return (
    <div>
      <h2>Payroll Slip</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Total Present Days: {result.totalPresentDays}</p>
          <p>Total Salary for Month: {result.totalSalaryForMonth}</p>
          <p>Calculated Salary: {result.calculatedSalary}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollSlip;
