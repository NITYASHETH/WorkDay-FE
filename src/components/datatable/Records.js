import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Records = ({ data, filter }) => {
  const filteredData = data.filter((user) => user.attendance === filter);

  const columns = [
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "mobileno", headerName: "Mobile No", width: 150 },
  ];

  return (
    <div className="records">
      <h2>{filter} Users</h2>
      <DataGrid rows={filteredData} columns={columns} pageSize={9} rowsPerPageOptions={[9]} />
    </div>
  );
};

export default Records;
