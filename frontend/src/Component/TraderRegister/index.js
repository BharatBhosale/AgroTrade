import React, { useState } from "react";
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
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Trader Data:", formData);
      alert("Trader Registered ✅");
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
            <input onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
            {errors.name && <span className="error">Required</span>}
          </div>

          <div>
            <label>Business Name *</label>
            <input onChange={(e)=>setFormData({...formData, business:e.target.value})}/>
            {errors.business && <span className="error">Required</span>}
          </div>

          <div>
            <label>Email *</label>
            <input onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
            {errors.email && <span className="error">Required</span>}
          </div>

          <div>
            <label>Phone *</label>
            <input onChange={(e)=>setFormData({...formData, phone:e.target.value})}/>
            {errors.phone && <span className="error">Required</span>}
          </div>

          <div>
            <label>License *</label>
            <input onChange={(e)=>setFormData({...formData, license:e.target.value})}/>
            {errors.license && <span className="error">Required</span>}
          </div>

          <div>
            <label>Password *</label>
            <input type="password" onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
            {errors.password && <span className="error">Required</span>}
          </div>

          <div className="full">
            <label>Address *</label>
            <textarea onChange={(e)=>setFormData({...formData, address:e.target.value})}/>
            {errors.address && <span className="error">Required</span>}
          </div>

          <div>
            <label>City *</label>
            <input onChange={(e)=>setFormData({...formData, city:e.target.value})}/>
            {errors.city && <span className="error">Required</span>}
          </div>

          <div>
            <label>State *</label>
            <input onChange={(e)=>setFormData({...formData, state:e.target.value})}/>
            {errors.state && <span className="error">Required</span>}
          </div>

        </div>

        <button className="submit blue" onClick={handleSubmit}>
          Create Trader Account
        </button>

        <p className="back" onClick={() => setNavSelection("Home")}>
          ← Back to Home
        </p>

      </div>
    </div>
  );
};

export default TraderRegister;