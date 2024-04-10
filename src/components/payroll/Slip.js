// Slip.js

import React from 'react';

function Slip() {
  const containerStyle = {
    border: '2px solid #000',
    borderRadius: '10px',
    padding: '20px',
    width: 'fit-content',
    margin: '20px auto'
  };

  const labelStyle = {
    width: '100px', // Adjust width as needed
    textAlign: 'left'
  };

  return (
    <div className="outer-container">
      <div style={containerStyle}>
        <div className="box">
          <div className="bold">Salary Breakup</div>
          <div>
            <span style={labelStyle}><b>Basic:</b></span> $2000
          </div>
          <div>
            <span style={labelStyle}><b>DA:</b></span> $500
          </div>
          <div>
            <span style={labelStyle}><b>HR:</b></span> $300
          </div>
          <div className="bold"><b>Gross Salary:</b> $2800</div>
        </div>
        <div style={{ height: '20px' }}></div> {/* Spacer */}
        <div className="box">
          <div className="bold">Deductions</div>
          <div><b>Tax:</b> $400</div>
        </div>
        <div style={{ height: '60px' }}></div> {/* Spacer */}
        <div className="box">
          <div className="bold">Net Salary: $2400</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="button">Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Slip;
