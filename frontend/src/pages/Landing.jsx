import React from "react";
import { useNavigate } from "react-router-dom";
import "@lottiefiles/dotlottie-wc";
import "../styles/Landing.css";
import PublicNavbar from "../components/PublicNavbar";
import PrivateNavbar from "../components/PrivateNavbar";
function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      onClick={() => navigate("/signup")}
    >
      <dotlottie-wc
        src="https://lottie.host/47f133ef-00ca-40cb-82ee-1eebb15b2a14/KXxbt2fQbu.lottie"
        style={{ width: "300px", height: "300px" }}
        autoplay
        loop
      ></dotlottie-wc>

      <h1 className="app-name">Budget Beam</h1>
      <p>Click anywhere to start</p>
    </div>
  );
}

export default Landing;