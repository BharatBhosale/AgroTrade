import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const Transaction = ({ setNavSelection }) => {
  const farmer = JSON.parse(localStorage.getItem("selectedFarmer"));

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    crop: farmer?.crop || "",
    quantity: "",
    rate: "",
    charges: 0,
    cut: 0,
  });

  // Calculate total amount
  const calculateTotal = () => {
    const baseAmount = (formData.quantity || 0) * (formData.rate || 0);
    const chargesAmount = formData.charges || 0;
    const cutAmount = formData.cut || 0;
    const total = baseAmount - chargesAmount - cutAmount;
    return total > 0 ? total : 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "crop" ? value : parseFloat(value) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.crop || !formData.quantity || !formData.rate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Prepare transaction data
     const transactionData = {

  // FARMER
  farmerId: farmer.id,

  farmerName: farmer.farmerName,

  farmerEmail: farmer.email,

  // TRADER
  traderId: user.id,

  traderName: user.name,

  traderEmail: user.email,

  // TRANSACTION
  crop: formData.crop,

  quantity: formData.quantity,

  rate: formData.rate,

  baseAmount:
    formData.quantity * formData.rate,

  charges: formData.charges,

  cut: formData.cut,

  totalAmount: calculateTotal(),

  status: "Completed",
};

      // Save transaction to backend
      const response = await axios.post(
        "http://localhost:8080/api/transactions/create",
        transactionData,
      );

      alert("Transaction Created Successfully ✅");
      console.log("Transaction Response:", response.data);

      // Go back to dashboard
      setNavSelection("TraderDashboard");
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Error creating transaction: " + error.message);
    }
  };

  if (!farmer) {
    return (
      <div className={styles.container}>
        <p>No farmer selected. Please go back and select a farmer.</p>
        <button onClick={() => setNavSelection("TraderDashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const totalAmount = calculateTotal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => setNavSelection("TraderDashboard")}
        >
          ← Back
        </button>
        <h1 className={styles.title}>💰 New Transaction</h1>
      </div>

      <div className={styles.content}>
        {/* FARMER INFO SECTION */}
        <div className={styles.farmerInfo}>
          <h2>👨‍🌾 Farmer Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Name:</label>
              <p>{farmer.farmerName}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Email:</label>
              <p>{farmer.email}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Phone:</label>
              <p>{farmer.phone}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Location:</label>
              <p>{farmer.location}</p>
            </div>
          </div>
        </div>

        {/* TRANSACTION FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>📋 Transaction Details</h2>

          {/* CROP */}
          <div className={styles.formGroup}>
            <label>Crop *</label>
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleInputChange}
              placeholder="Enter crop name"
              required
            />
          </div>

          {/* QUANTITY */}
          <div className={styles.formGroup}>
            <label>Quantity (kg) *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity in kg"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* RATE/PRICE */}
          <div className={styles.formGroup}>
            <label>Rate (₹/kg) *</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Enter rate per kg"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* BASE AMOUNT (AUTO) */}
          <div className={styles.formGroup}>
            <label>Base Amount (₹)</label>
            <input
              type="number"
              value={(formData.quantity * formData.rate).toFixed(2)}
              readOnly
              className={styles.readOnly}
            />
          </div>

          {/* CHARGES */}
          <div className={styles.formGroup}>
            <label>Charges (₹)</label>
            <input
              type="number"
              name="charges"
              value={formData.charges}
              onChange={handleInputChange}
              placeholder="Enter charges"
              min="0"
              step="0.01"
            />
          </div>

          {/* CUT/DEDUCTION */}
          <div className={styles.formGroup}>
            <label>Cut/Deduction (₹)</label>
            <input
              type="number"
              name="cut"
              value={formData.cut}
              onChange={handleInputChange}
              placeholder="Enter cut or deduction amount"
              min="0"
              step="0.01"
            />
          </div>

          {/* TOTAL AMOUNT */}
          <div className={styles.totalAmount}>
            <label>Total Amount (₹)</label>
            <div className={styles.totalValue}>₹{totalAmount.toFixed(2)}</div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className={styles.submitBtn}>
            💾 Create Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
