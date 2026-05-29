import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import styles from "./style.module.css";

const FarmerDashboard = ({ setNavSelection }) => {
  // Safe parsing with fallback to prevent crashes if localStorage is empty
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")) || {}, []);

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeConnections: 0,
    monthlyIncome: 0,
  });

  const [transactions, setTransactions] = useState([]);

  // Wrapped in useCallback to prevent unnecessary re-creations
  const fetchDashboard = useCallback(() => {
    if (!user.id) return;
    axios
      .get(`http://localhost:8080/api/dashboard/farmer/${user.id}`)
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Dashboard Error:", error);
      });
  }, [user.id]);

  const fetchTransactions = useCallback(async () => {
    if (!user.email) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/farmer/email/${user.email}`
      );
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Fetch Transactions Error:", error);
    }
  }, [user.email]);

  // Combined fetch function for polling clarity
  const fetchAllData = useCallback(() => {
    fetchDashboard();
    fetchTransactions();
  }, [fetchDashboard, fetchTransactions]);

  useEffect(() => {
    // 1. Load everything immediately on component mount
    fetchAllData();

    // 2. Safely setup auto-refresh every 2 seconds
    const interval = setInterval(() => {
      fetchAllData();
    }, 2000);

    // 3. Cleanup to prevent memory leaks when navigating away
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Memoize total income calculation so it only runs when transactions change
  const totalIncome = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0);
  }, [transactions]);

  // Safely get the amount of the most recent transaction
  const lastTransactionAmount = useMemo(() => {
    if (transactions.length === 0) return 0;
    // Assumes the last item in the array is the most recent, or adjust based on API sorting
    const lastTx = transactions[transactions.length - 1];
    return lastTx?.totalAmount || 0;
  }, [transactions]);

  return (
    <div className={styles.dashboard}>
      {/* HEADER SECTION */}
      <h1 className={styles.title}>Farmer Dashboard</h1>

      {/* TOP STATS */}
      <div className={styles.stats}>
        <div className={styles.card}>
          <p>Total Transactions</p>
          <h2>{transactions.length}</h2>
        </div>

        <div className={styles.card}>
          <p>Active Connections</p>
          <h2>{dashboardData.activeConnections}</h2>
        </div>

        <div className={styles.card}>
          <p>Last Transaction</p>
          <h2>₹{lastTransactionAmount}</h2>
        </div>

        <div className={styles.card}>
          <p>Total Income</p>
          <h2>₹{totalIncome}</h2>
        </div>
      </div>

      {/* FEATURES */}
      <div className={styles.features}>
        <div className={styles.feature} onClick={() => setNavSelection("FarmerSearchTrader")}>
          🔍 <h3>Search Traders</h3>
          <p>Find verified traders near you by crop type and location</p>
        </div>

        <div className={styles.feature} onClick={() => setNavSelection("Prices")}>
          <div className={styles.icon}>📈</div>
          <h3>Real-Time Prices</h3>
          <p>Check live market crop prices</p>
        </div>

        <div className={styles.feature} onClick={() => setNavSelection("Transactions")}>
          📄 <h3>Transactions</h3>
          <p>View transaction history</p>
        </div>

        <div className={styles.feature} onClick={() => setNavSelection("Reviews")}>
          ⭐ <h3>Ratings & Reviews</h3>
          <p>Rate and review traders</p>
        </div>

        <div className={styles.feature} onClick={() => setNavSelection("Reports")}>
          📊 <h3>Reports</h3>
          <p>Generate reports</p>
        </div>

        <div className={styles.feature} onClick={() => setNavSelection("Profile")}>
          👤 <h3>Profile</h3>
          <p>Manage your account</p>
        </div>
      </div>

      {/* ML SECTION */}
      <div className={styles.mlSection}>
        <h2>🎯 ML-Powered Recommendations</h2>
        <p>Get personalized trader recommendations based on performance, ratings and history.</p>

        <div className={styles.recommendations}>
          <div className={styles.recCard}>
            <h3>Raj Trading Co.</h3>
            <p>⭐ 4.8 rating</p>
            <p>156 transactions</p>
            <p>Rice & Wheat</p>
            <p>2.3 km away</p>
            <button>Contact Trader</button>
          </div>

          <div className={styles.recCard}>
            <h3>Krishna Exports</h3>
            <p>⭐ 4.9 rating</p>
            <p>203 transactions</p>
            <p>Vegetables</p>
            <p>4.1 km away</p>
            <button>Contact Trader</button>
          </div>

          <div className={styles.recCard}>
            <h3>Mahesh Traders</h3>
            <p>⭐ 4.7 rating</p>
            <p>134 transactions</p>
            <p>Fruits</p>
            <p>5.8 km away</p>
            <button>Contact Trader</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;