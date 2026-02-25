import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [strength, setStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setStrength("Weak");
    } else if (password.length < 10) {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    alert("Account Created Successfully 🎉");
    navigate("/login");
  };

  return (
    <div className="signup-container">

      <div className="signup-left">
        <DotLottieReact
          src="https://lottie.host/e740a7c0-116b-4270-afd7-27eca649b469/hNUD5QZrBd.lottie"
          autoplay
          loop
          style={{ width: "480px", height: "480px" }}
        />
      </div>

      <div className="signup-right">
        <div className="glass-card">

          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>

            <div className="input-group">
              <input
                type="text"
                name="name"
                required
                placeholder=" "
                onChange={handleChange}
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                required
                placeholder=" "
                onChange={handleChange}
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                required
                placeholder=" "
                onChange={handleChange}
              />
              <label>Password</label>
            </div>

            {strength && (
              <p className={`strength ${strength.toLowerCase()}`}>
                Password Strength: {strength}
              </p>
            )}

            <button type="submit">Sign Up</button>

          </form>

          <p className="switch-text">
            Already have an account?
            <span onClick={() => navigate("/login")}> Login</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;