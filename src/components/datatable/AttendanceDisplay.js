import React, { useState, useEffect } from 'react';

const AttendanceDisplay = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:3001/attendance');
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h1>Attendance Data</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendanceRecord, index) => (
            <tr key={index}>
              <td>{attendanceRecord.user_id}</td>
              <td>{attendanceRecord.date}</td>
              <td>{attendanceRecord.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDisplay;
