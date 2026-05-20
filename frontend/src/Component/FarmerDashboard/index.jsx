import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const FarmerDashboard = ({ setNavSelection }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeConnections: 0,
    averageRating: 0,
    monthlyIncome: 0
  });

  useEffect(() => {

    axios
      .get("http://localhost:8080/api/dashboard/1")
      .then((response) => {

        console.log(response.data);

        setDashboardData(response.data);

      })
      .catch((error) => {

        console.log("Dashboard Error:", error);

      });

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");

    alert("Logged Out ✅");

    setNavSelection("Home");

  };

  return (

    <div className={styles.dashboard}>

      {/* HEADER */}

      <div className={styles.dashboardHeader}>

        <h2 className={styles.logo}>
          🌱 FarmConnect
        </h2>

        <div className={styles.userInfo}>

          <span>
            Welcome, {user?.full_name || "Farmer"}
          </span>

          <button
            className={styles.logout}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      <h1 className={styles.title}>
        Farmer Dashboard
      </h1>

      {/* TOP STATS */}

      <div className={styles.stats}>

        <div className={styles.card}>
          <p>Total Transactions</p>

          <h2>
            {dashboardData.totalTransactions}
          </h2>
        </div>

        <div className={styles.card}>
          <p>Active Connections</p>

          <h2>
            {dashboardData.activeConnections}
          </h2>
        </div>

        <div className={styles.card}>
          <p>Average Rating</p>

          <h2>
            {dashboardData.averageRating}
          </h2>
        </div>

        <div className={styles.card}>
          <p>This Month</p>

          <h2>
            ₹{dashboardData.monthlyIncome}
          </h2>
        </div>

      </div>

      {/* FEATURES */}

      <div className={styles.features}>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Search")}
        >
          🔍

          <h3>Search Traders</h3>

          <p>
            Find verified traders near you by crop type and location
          </p>

        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Prices")}
        >
          📈

          <h3>Real-Time Prices</h3>

          <p>
            Check live market prices for crops
          </p>

        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Transactions")}
        >
          📄

          <h3>Transactions</h3>

          <p>
            View transaction history
          </p>

        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Reviews")}
        >
          ⭐

          <h3>Ratings & Reviews</h3>

          <p>
            Rate and review traders
          </p>

        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Reports")}
        >
          📊

          <h3>Reports</h3>

          <p>
            Generate reports
          </p>

        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Profile")}
        >
          👤

          <h3>Profile</h3>

          <p>
            Manage your account
          </p>

        </div>

      </div>

      {/* ML SECTION */}

      <div className={styles.mlSection}>

        <h2>
          🎯 ML-Powered Recommendations
        </h2>

        <p>
          Get personalized trader recommendations
          based on performance, ratings and history.
        </p>

        <div className={styles.recommendations}>

          <div className={styles.recCard}>

            <h3>
              Raj Trading Co.
            </h3>

            <p>⭐ 4.8 rating</p>

            <p>156 transactions</p>

            <p>Rice & Wheat</p>

            <p>2.3 km away</p>

            <button>
              Contact Trader
            </button>

          </div>


          <div className={styles.recCard}>

            <h3>
              Krishna Exports
            </h3>

            <p>⭐ 4.9 rating</p>

            <p>203 transactions</p>

            <p>Vegetables</p>

            <p>4.1 km away</p>

            <button>
              Contact Trader
            </button>

          </div>


          <div className={styles.recCard}>

            <h3>
              Mahesh Traders
            </h3>

            <p>⭐ 4.7 rating</p>

            <p>134 transactions</p>

            <p>Fruits</p>

            <p>5.8 km away</p>

            <button>
              Contact Trader
            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default FarmerDashboard;