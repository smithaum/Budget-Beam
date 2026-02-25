import React from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" onClick={() => navigate("/dashboard")}>
      <DotLottieReact
        src="https://lottie.host/e740a7c0-116b-4270-afd7-27eca649b469/hNUD5QZrBd.lottie"
        autoplay
        loop
        style={{ width: "450px", height: "450px" }}
      />
      <h1 className="app-name">Budget Beam</h1>
      <p>Click</p>
    </div>
  );
}

export default Landing;