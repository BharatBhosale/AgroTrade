import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const TraderRegister = ({ setNavSelection }) => {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    license: "",
    password: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    crops: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = true;
    if (!formData.business) newErrors.business = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.license) newErrors.license = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.state) newErrors.state = true;
    if (!formData.latitude) newErrors.latitude = true;
    if (!formData.longitude) newErrors.longitude = true;
    // crops are optional, so no validation required

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/traders/register",
          {
            fullName: formData.name,
            business: formData.business,
            email: formData.email,
            phone: formData.phone,
            license: formData.license,
            password: formData.password,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            crops: formData.crops
              ? formData.crops
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean)
                  .join(", ")
              : "",
          },
        );

        console.log(response.data);

        alert("Trader Registered Successfully ✅");

        setFormData({
          name: "",
          business: "",
          email: "",
          phone: "",
          license: "",
          password: "",
          address: "",
          city: "",
          state: "",
          latitude: "",
          longitude: "",
          crops: "",
        });

        setNavSelection("Login");
      } catch (error) {
        console.log(error);

        alert("Registration Failed ❌");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>🌱 FarmConnect</h2>
        <h3>Register as Trader</h3>
        <p>Join our platform to connect with farmers</p>

        <div className="form-grid">
          <div>
            <label>Full Name *</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
            {errors.name && <span className="error">Required</span>}
          </div>

          <div>
            <label>Business Name *</label>
            <input
              value={formData.business}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  business: e.target.value,
                })
              }
            />
            {errors.business && <span className="error">Required</span>}
          </div>

          <div>
            <label>Crops (comma separated)</label>
            <input
              placeholder="e.g., Rice, Wheat, Vegetables"
              value={formData.crops}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  crops: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Email *</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
            {errors.email && <span className="error">Required</span>}
          </div>

          <div>
            <label>Phone *</label>
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
            {errors.phone && <span className="error">Required</span>}
          </div>

          <div>
            <label>Trading License *</label>
            <input
              value={formData.license}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  license: e.target.value,
                })
              }
            />
            {errors.license && <span className="error">Required</span>}
          </div>

          <div>
            <label>Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            {errors.password && <span className="error">Required</span>}
          </div>

          <div className="full">
            <label>Business Address *</label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
            {errors.address && <span className="error">Required</span>}
          </div>

          <div>
            <label>City *</label>
            <input
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />
            {errors.city && <span className="error">Required</span>}
          </div>

          <div>
            <label>State *</label>
            <input
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
            />
            {errors.state && <span className="error">Required</span>}
          </div>

          <div>
            <label>Latitude (GPS) *</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g., 28.6139"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  latitude: e.target.value,
                })
              }
            />
            {errors.latitude && <span className="error">Required</span>}
          </div>

          <div>
            <label>Longitude (GPS) *</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g., 77.2099"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longitude: e.target.value,
                })
              }
            />
            {errors.longitude && <span className="error">Required</span>}
          </div>
        </div>

        <button className="submit blue" onClick={handleSubmit}>
          Create Trader Account
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => setNavSelection("Login")}>
            Login
          </span>
        </p>

        <p className="back" onClick={() => setNavSelection("Home")}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
};

export default TraderRegister;
