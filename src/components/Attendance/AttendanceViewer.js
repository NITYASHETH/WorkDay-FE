import React, { useState, useEffect } from 'react';

const fetchAttendanceRecords = async (year, month) => {
  const response = await fetch(`http://localhost:3001/attendance/all?year=${year}&month=${month}`);
  if (!response.ok) {
    throw new Error('Failed to fetch attendance records');
  }
  const data = await response.json();
  return data.attendanceRecords;
};

const AttendanceViewer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const getAttendanceRecords = async () => {
      try {
        const attendanceData = await fetchAttendanceRecords(year, month);
        setAttendanceRecords(attendanceData);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };
    getAttendanceRecords();
  }, [year, month]);

  return (
    <div>
      <h2>Attendance Viewer</h2>
      <div>
        <label htmlFor="year">Year:</label>
        <input 
          type="number" 
          id="year" 
          value={year} 
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor="month">Month:</label>
        <input 
          type="number" 
          id="month" 
          value={month} 
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div>
        <h3>Attendance Records</h3>
        <ul>
          {attendanceRecords.length > 0 &&
            attendanceRecords.map((record, index) => (
              <li key={index}>
                User: {record.user_id ? record.user_id.fname : 'Unknown'}, Date: {record.date}, Status: {record.status}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default AttendanceViewer;
