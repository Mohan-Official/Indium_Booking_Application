import React, { useState, useEffect } from 'react';
import './ReservationUpComing.css';

function createData(name, reservationDate, time, roomType) {
  return { name, reservationDate, time, roomType };
}

const rows = [
  createData('Mei', '2025-01-08', '17:25:00 AM', 'Maddison Square'),
  createData('Mohan', '2025-01-31', '12:30:00 AM', 'ST. Andrews'),
  createData('Praneeth', '2025-01-06', '12:31:00 AM', 'Adelaide Oval'),
  createData('Krish', '2025-01-06', '12:32:00 AM', 'Colloseum'),
  createData('Balaji', '2025-01-06', '12:33:00 AM', 'Lord\'s'),
  createData('Laxhmi', '2025-01-06', '12:34:00 AM', 'Chepauk'),
  createData('Safrin', '2025-01-06', '12:35:00 AM', 'Wankhede'),
  createData('Gopi', '2025-01-06', '12:29:00 AM', 'Gabba'),
  createData('Mei', '2025-01-06', '12:30:00 AM', 'Rucher Park'),
  createData('Mohan', '2025-01-06', '12:31:00 AM', 'Roland Garos')
];

function filterRowsByTime(rows) {
  const currentTime = new Date();

  return rows.filter(row => {
    const [rowHours, rowMinutes, rowSeconds, period] = row.time.split(/[: ]/);

    const [year, month, day] = row.reservationDate.split('-');
    const rowDate = new Date(year, month - 1, day, period === 'PM' ? parseInt(rowHours) + 12 : parseInt(rowHours), parseInt(rowMinutes), parseInt(rowSeconds));

    return rowDate > currentTime;
  });
}

const  ReservationUpComing = ()=> {
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilteredRows(filterRowsByTime(rows));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="table-container">
      <h4> My Booking (Up Coming)</h4>
      <table className="reservation-table">
        <thead style={{backgroundColor:'#CACACA'}}>
          <tr>
            <th>Name</th>
            <th>Reservation Date</th>
            <th>Time</th>
            <th>Room Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.name + row.time}>
              <td>{row.name}</td>
              <td>{row.reservationDate}</td>
              <td>{row.time}</td>
              <td>{row.roomType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationUpComing