
import React from "react";
import Background from "../../assets/login.jpg";
import "./BackgroundImage.css";

const BackgroundImage = () => {
  return (
    <div className="background-container">
      <img src={Background} alt="Background" />
    </div>
  );
};

export default BackgroundImage;
