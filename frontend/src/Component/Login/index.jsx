import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const Login = ({ setNavSelection, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = true;
    }

    if (!formData.password) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData,
      );

      console.log("LOGIN RESPONSE:", response.data);

      // SAVE FULL USER DATA
      localStorage.setItem("user", JSON.stringify(response.data));

      // SAVE USER STATE
      setUser(response.data);

      // FARMER LOGIN
      if (response.data.role === "farmer") {
        alert("Farmer Login Successful ✅");

        setNavSelection("Dashboard");
      }

      // TRADER LOGIN
      else if (response.data.role === "trader") {
        alert("Trader Login Successful ✅");

        setNavSelection("TraderDashboard");
      }

      // INVALID LOGIN
      else {
        alert("Invalid Email or Password ❌");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert("Server Error ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="logo">🌱 FarmConnect</h2>

        <h3>Welcome Back</h3>

        <div className="login-grid">
          {/* EMAIL */}
          <div>
            <label>Email Address</label>

            <input
              value={formData.email}
              placeholder="your@email.com"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            {errors.email && <span className="error">Required</span>}
          </div>

          {/* PASSWORD */}
          <div>
            <label>Password</label>

            <input
              type="password"
              value={formData.password}
              placeholder="********"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            {errors.password && <span className="error">Required</span>}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        {/* FARMER SIGNUP */}
        <p className="switch">
          Don't have an account?{" "}
          <span className="farmer" onClick={() => setNavSelection("Farmer")}>
            Sign up as Farmer
          </span>
        </p>

        {/* TRADER SIGNUP */}
        <p className="switch">
          Are you a trader?{" "}
          <span className="trader" onClick={() => setNavSelection("Trader")}>
            Sign up as Trader
          </span>
        </p>

        {/* BACK */}
        <p className="back" onClick={() => setNavSelection("Home")}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
};

export default Login;
