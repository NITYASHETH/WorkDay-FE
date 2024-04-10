import React, { useState, useEffect } from "react";
import axios from "axios";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import UserDetailsModal from "./UserDetailsModal";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRole = getUserRole();
      const userCid = getUserByCid();
      let endpoint = `http://localhost:3001/users`;

      switch (userRole) {
        case "admin":
          break;
        case "hr":
          endpoint = `http://localhost:3001/users?role=manager&role=employee&cid=${userCid}`;
          break;
        case "employee":
          endpoint = "http://localhost:3001/profile";
          break;
        case "company":
          endpoint = `http://localhost:3001/users?role=manager&role=employee&role=hr&cid=${userCid}`;
          break;
        case "manager":
          endpoint = `http://localhost:3001/users?role=employee&cid=${userCid}`;
          break;
        default:
          break;
      }

      const response = await axios.get(endpoint);

      const userListWithId = response.data.userList.map((user, index) => ({
        ...user,
        id: user._id
      }));

      setData(userListWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserRole = () => {
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    return userData.role;
  };

  const getUserByCid = () => {
    const userDataString = localStorage.getItem("users");
    const userData = JSON.parse(userDataString);
    return userData.cid;
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const userColumns = [
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "mobileno", headerName: "Mobile No", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="actionButtons">
          <div
            className="viewButton"
            onClick={() => handleViewClick(params.row)}
          >
            View
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="addButtonContainer">
        <Link to="/register" className="addButton">
          Add Users
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <UserDetailsModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
};

export default DataTable;
