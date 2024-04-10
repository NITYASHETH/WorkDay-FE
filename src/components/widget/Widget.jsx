// import { useEffect, useState } from "react";
// import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import TotalEmployeesDisplay from "./TotalEmployeesDisplay"; // Import TotalEmployeesDisplay component
// import { Typography, Box } from "@mui/material"; // Import Typography and Box from MUI

// const Widget = ({ type }) => {
//   let data = {}; // Initialize data object

//   // Temporary
//   const amount = 0;
//   const diff = 0;

//   switch (type) {
//     case "leaveRequests":
//       data = {
//         title: "Leave Requests", // Set title to Leave Requests
//         link: "", // Leave link empty
//         icon: (
//           <KeyboardArrowUpIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "approvedLeave":
//       data = {
//         title: "Approved Leave", // Set title to Approved Leave
//         link: "", // Leave link empty
//         icon: (
//           <KeyboardArrowUpIcon
//             className="icon"
//             style={{
//               color: "green",
//               backgroundColor: "rgba(0, 255, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "rejectedLeave":
//       data = {
//         title: "Rejected Leave", // Set title to Rejected Leave
//         link: "", // Leave link empty
//         icon: (
//           <KeyboardArrowUpIcon
//             className="icon"
//             style={{
//               color: "red",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "remainingLeave":
//       data = {
//         title: "Remaining Leave", // Set title to Remaining Leave
//         link: "", // Leave link empty
//         icon: (
//           <KeyboardArrowUpIcon
//             className="icon"
//             style={{
//               color: "blue",
//               backgroundColor: "rgba(0, 0, 255, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     default:
//       break;
//   }

//   return (
//     <Box className="widget" display="flex" alignItems="center" justifyContent="space-between">
//       <Box>
//         <Typography variant="h6">{data.title}</Typography>
//         {/* Depending on the type, display different information */}
//         {type === "leaveRequests" && <Typography variant="body2">Display leave requests here</Typography>}
//         {type === "approvedLeave" && <Typography variant="body2">Display approved leave here</Typography>}
//         {type === "rejectedLeave" && <Typography variant="body2">Display rejected leave here</Typography>}
//         {type === "remainingLeave" && <Typography variant="body2">Display remaining leave here</Typography>}
//         {/* You can replace these placeholder texts with actual data or components */}
//       </Box>
//       <Box display="flex" alignItems="center">
//         {data.icon}
//       </Box>
//     </Box>
//   );
// };

// export default Widget;
