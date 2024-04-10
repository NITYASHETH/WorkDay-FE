export const userColumns = [
   { field: "id", headerName: "ID", width: 70 },
  {
    field: "fname",
    headerName: "fname",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "role",
    headerName: "role",
    width: 100,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
     id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
 
];


// import getUsersData from './getData'; // Import the function to fetch user data
//import UserSchema from './models/userSchema';
// import UserSchema from '../../server/models/userSchema';
// import getUsersData from '../../server/db/getData'; // Corrected import path
// import getUsersData from '../../server/getData';

// Rest of your code...



// export const userColumns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "fname", headerName: "First Name", width: 150 },
//   { field: "email", headerName: "Email", width: 200 },
//   { field: "role", headerName: "Role", width: 120 },
//   { field: "status", headerName: "Status", width: 120 },
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "fname",
//     headerName: "fname",
//     width: 230,
//     renderCell: (params) => {
//       return (
//         <div className="cellWithImg">
//           <img className="cellImg" src={params.row.img} alt="avatar" />
//           {params.row.fname}
//         </div>
//       );
//     },
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 230,
//   },
//   {
//     field: "role",
//     headerName: "role",
//     width: 100,
//   },
//   {
//     field: "Status",
//     headerName: "Status",
//     width: 160,
//     renderCell: (params) => {
//       return (
//         <div className={`cellWithStatus ${params.row.status}`}>
//           {params.row.status}
//         </div>
//       );
//     },
//   },
// ];

// // Fetch user data and export it
// export const userRows = getUsersData();
