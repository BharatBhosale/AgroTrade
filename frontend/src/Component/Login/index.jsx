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

      const userData = response.data;

      if (userData.role === "farmer") {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        alert("Farmer Login Successful ✅");
        setNavSelection("Dashboard");
      } else if (userData.role === "trader") {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        alert("Trader Login Successful ✅");
        setNavSelection("TraderDashboard");
      } else {
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
          {}
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

          {}
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

        {}
        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        {}
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
