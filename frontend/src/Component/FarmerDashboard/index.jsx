import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import styles from "./style.module.css";

const FarmerDashboard = ({ setNavSelection }) => {
  
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")) || {}, []);

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeConnections: 0,
    monthlyIncome: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState("");

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

  
  const fetchAllData = useCallback(() => {
    fetchDashboard();
    fetchTransactions();
  }, [fetchDashboard, fetchTransactions]);

  const fetchRecommendations = useCallback(async () => {
    if (!user.id) return;

    try {
      setRecommendationsLoading(true);
      setRecommendationsError("");

      const response = await fetch(
        `http://localhost:8080/api/ml/recommendations/farmer/${user.id}?limit=3&t=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Recommendations Error:", error);
      setRecommendationsError(
        "Unable to load recommendations. Please try again later."
      );
    } finally {
      setRecommendationsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchAllData();
    fetchRecommendations();

    const interval = setInterval(() => {
      fetchAllData();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchAllData, fetchRecommendations]);

  
  const totalIncome = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0);
  }, [transactions]);

  
  const lastTransactionAmount = useMemo(() => {
    if (transactions.length === 0) return 0;
    
    const lastTx = transactions[transactions.length - 1];
    return lastTx?.totalAmount || 0;
  }, [transactions]);

  return (
    <div className={styles.dashboard}>
      {}
      <h1 className={styles.title}>Farmer Dashboard</h1>

      {}
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

      {}
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

      {}
      <div className={styles.mlSection}>
        <h2>🎯 ML-Powered Recommendations</h2>
        <p>Get personalized trader recommendations based on performance, ratings and history.</p>

        <div className={styles.recommendations}>
          {recommendationsLoading && (
            <p className={styles.loadingText}>Loading smart recommendations...</p>
          )}

          {recommendationsError && (
            <p className={styles.errorText}>{recommendationsError}</p>
          )}

          {!recommendationsLoading && !recommendationsError && recommendations.length === 0 && (
            <p className={styles.emptyText}>
              No recommendations available yet. Add traders, reviews, or transactions to improve recommendations.
            </p>
          )}

          {!recommendationsLoading && !recommendationsError && recommendations.map((rec) => (
            <div key={rec.traderId} className={styles.recCard}>
              <h3>{rec.business || rec.traderName}</h3>
              <p>Rating: {Number(rec.rating || 0).toFixed(1)} ⭐ ({rec.totalReviews || 0} reviews)</p>
              <p>Crops: {rec.crops || "N/A"}</p>
              <p>Location: {rec.city || "Unknown"}, {rec.state || "Unknown"}</p>
              <p>Transactions: {rec.transactionCount ?? 0}</p>
              <p>Active Farmers: {rec.activeFarmers ?? 0}</p>
              <p>Match Score: {Math.round(rec.matchScore ?? 0)}%</p>
              <p>{rec.reason}</p>
              <button
                onClick={() => {
                  localStorage.setItem("selectedTrader", JSON.stringify(rec));
                  setNavSelection("FarmerSearchTrader");
                }}
              >
                View Trader
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;