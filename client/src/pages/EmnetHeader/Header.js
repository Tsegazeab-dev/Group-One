import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../CONTEXT/UserContext";
import "./Header.css";

const Header = ({loginRes}) => {
  const [userData, setUserData] = useContext(UserContext);

  // const handleAuthentication = () => {
  //   if (userData) {
  //     
  //   }
  // };

  return (
    <div className="nav">
      <Link to="/">
      <img
        className="nav__image"
        src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
        alt=""
      />
      </Link>

        <Link to={!userData && "/login"} className="link">
      <div className="nav__bar">
        <span>Home</span>
        <span className="nav__works">How it Works</span>
          {/* <div onClick={handleAuthentication} className=""> */}
            <button>{!userData ? "SIGN IN" : "LogOut"}</button>
          {/* </div> */}
      </div>
        </Link>
        


    </div>
  );
};

export default Header;
