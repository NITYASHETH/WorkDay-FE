import "./navbar.scss";
import { Link } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"; // Import the Notifications icon
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="item">
          <Link to="/alertdisplay" className="icon-link">
            <NotificationsNoneOutlinedIcon className="icon notification-icon" /> {/* Use Notifications icon */}
          </Link>
        </div>
        <div className="item">
          <Link to="/alert" className="icon-link">
            <ChatBubbleOutlineOutlinedIcon className="icon chat-icon" /> {/* Keep ChatBubble icon */}
          </Link>
        </div>
        <div className="item">
          <Link to="/register" className="icon-link">
            <MenuIcon className="icon hamburger-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
