import "./topbar.css";
import { Link } from "react-router-dom";
const TopBar = () => {
  const user = false;
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem">{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <img
            className="topImage"
            src="data:image/jpeg;base64,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"
            alt="profile image"
          />
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default TopBar;
