// import { Card, CardContent, Typography } from "@mui/material";

// const CustomCard = ({ title, value }) => {
//   return (
//     <Card style={{ flex: 1, margin: '0 8px', borderRadius: '8px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', minWidth: '200px' }}>
//       <CardContent>
//         <Typography variant="h5" component="h2">
//           {title}
//         </Typography>
//         <Typography variant="body2" component="p">
//           {value}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default CustomCard;
import { Card, CardContent, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbDownOffAltSharpIcon from '@mui/icons-material/ThumbDownOffAltSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

const CustomCard = ({ title, value, style, fontColor, isRegistered, isApproved, isRejected }) => {
  // Function to get user details from local storage
  const getUserDetailsFunc = () => {
    const user = localStorage.getItem("users");
    const userDetails = JSON.parse(user);
    return userDetails?.role;
  };

  // Define custom styles for the card
  const cardStyle = {
    ...style,
    borderRadius: '10px', // Increase border radius for a more square shape
    width: '300px', // Increase width for a bigger card
    height: '200px', // Increase height for a bigger card
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  const titleStyle = {
    textAlign: 'center',
    marginTop: '10px',
    color: fontColor
  };

  // Render the card only if the user is an HR
  if (getUserDetailsFunc() === "company" || getUserDetailsFunc() === "employee" || getUserDetailsFunc() === "hr" || getUserDetailsFunc() === "admin" || getUserDetailsFunc() === "manager") {
    return (
      <Card style={cardStyle}>
        <CardContent style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {title === "Leave Requests" && <AccountCircleIcon style={{ fontSize: 40, color: fontColor, marginRight: '10px' }} />}
            <Typography variant="h5" component="h2" style={{ ...titleStyle, marginLeft: title === "Leave Requests" ? '0' : '50px' }}>
              {title}
            </Typography>
            {isRegistered && <HowToRegIcon style={{ fontSize: 20, color: '', marginLeft: '10px' }} />}
            {isApproved && <HowToRegIcon style={{ fontSize: 20, color: 'green', marginLeft: '10px' }} />}
            {isRejected && <HowToRegIcon  style={{ fontSize: 20, color: 'red', marginLeft: '10px' }} />}
          </div>
          <Typography variant="body2" component="p" style={{ ...titleStyle, marginTop: 'auto' }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return null; // Render nothing if user is not HR
  }
};

export default CustomCard;
