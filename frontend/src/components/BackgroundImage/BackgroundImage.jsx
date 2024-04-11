// import React from "react";
// import Background from "../assets/login.jpg";
// import styled from "styled-components";

// const BackgroundImage = () => {
//   return (
//     <Container>
//       <img src={Background} alt="Background" />
//     </Container>
//   );
// };

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   img {
//     height: 100vh;
//     width: 100vw;
//   }
// `;

// export default BackgroundImage;

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
