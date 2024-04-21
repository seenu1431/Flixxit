import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Flixxit-font.png";
import "./Header.css";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header-container flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </div>
  );
};

export default Header;