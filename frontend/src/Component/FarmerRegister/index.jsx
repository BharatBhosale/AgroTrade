import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const FarmerRegister = ({ setNavSelection }) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.state) newErrors.state = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      axios.post(
        "http://localhost:8080/api/farmers/register",
        formData
      )

      .then((response) => {

        console.log(response.data);

        alert("Farmer Registered Successfully ✅");

        setNavSelection("Login");

      })

      .catch((error) => {

        console.log(error);

        alert("Registration Failed ❌");

      });

    }
  };

  return (
    <div className="form-container">
      <div className="form-card">

        <h2>🌱 FarmConnect</h2>
        <h3>Register as Farmer</h3>
        <p>Join our platform to connect with verified traders</p>

        <div className="form-grid">

          <div>
            <label>Full Name *</label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value
                })
              }
            />
            {errors.fullName && (
              <span className="error">Required</span>
            )}
          </div>

          <div>
            <label>Email *</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />
            {errors.email && (
              <span className="error">Required</span>
            )}
          </div>

          <div>
            <label>Phone *</label>
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
              }
            />
            {errors.phone && (
              <span className="error">Required</span>
            )}
          </div>

          <div>
            <label>Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
            />
            {errors.password && (
              <span className="error">Required</span>
            )}
          </div>

          <div className="full">
            <label>Address *</label>

            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value
                })
              }
            />

            {errors.address && (
              <span className="error">Required</span>
            )}
          </div>

          <div>
            <label>City *</label>
            <input
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value
                })
              }
            />
            {errors.city && (
              <span className="error">Required</span>
            )}
          </div>

          <div>
            <label>State *</label>
            <input
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value
                })
              }
            />
            {errors.state && (
              <span className="error">Required</span>
            )}
          </div>

        </div>

        <button
          className="submit green"
          onClick={handleSubmit}
        >
          Create Farmer Account
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => setNavSelection("Login")}
          >
            Login
          </span>
        </p>

        <p
          className="back"
          onClick={() => setNavSelection("Home")}
        >
          ← Back to Home
        </p>

      </div>
    </div>
  );
};

export default FarmerRegister;