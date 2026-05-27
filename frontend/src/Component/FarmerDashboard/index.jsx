import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const FarmerDashboard = ({ setNavSelection }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeConnections: 0,
    averageRating: 0,
    monthlyIncome: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const fetchDashboard = () => {
    axios
      .get(`http://localhost:8080/api/dashboard/farmer/${user.id}`)
      .then((response) => {
        console.log(response.data);

        setDashboardData(response.data);
      })
      .catch((error) => {
        console.log("Dashboard Error:", error);
      });
  };

  useEffect(() => {
    // FIRST LOAD
    fetchDashboard();

    // AUTO REFRESH EVERY 2 SECONDS
    const interval = setInterval(() => {
      fetchDashboard();
      fetchTransactions();
    }, 2000);

    // CLEANUP
    return () => clearInterval(interval);
  }, []);

  // FETCH TRANSACTIONS FOR FARMER
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/farmer/email/${user.email}`,
      );

      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("Fetch Transactions Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    alert("Logged Out ✅");

    setNavSelection("Home");
  };

  return (
    <div className={styles.dashboard}>
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
          <p>Average Rating</p>

          <h2>{dashboardData.averageRating}</h2>
        </div>

        <div className={styles.card}>
  <p>Total Income</p>

  <h2>
    ₹{
      transactions.reduce(
        (sum, tx) =>
          sum + (tx.totalAmount || 0),
        0
      )
    }
  </h2>
</div>
      </div>

      {/* FEATURES */}

      <div className={styles.features}>
        <div
          className={styles.feature}
          onClick={() => setNavSelection("FarmerSearchTrader")}
        >
          🔍
          <h3>Search Traders</h3>
          <p>Find verified traders near you by crop type and location</p>
        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Prices")}
        >
          <div className={styles.icon}>📈</div>

          <h3>Real-Time Prices</h3>

          <p>Check live market crop prices</p>
        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Transactions")}
        >
          📄
          <h3>Transactions</h3>
          <p>View transaction history</p>
        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Reviews")}
        >
          ⭐<h3>Ratings & Reviews</h3>
          <p>Rate and review traders</p>
        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Reports")}
        >
          📊
          <h3>Reports</h3>
          <p>Generate reports</p>
        </div>

        <div
          className={styles.feature}
          onClick={() => setNavSelection("Profile")}
        >
          👤
          <h3>Profile</h3>
          <p>Manage your account</p>
        </div>
      </div>

      {/* ML SECTION */}

      <div className={styles.mlSection}>
        <h2>🎯 ML-Powered Recommendations</h2>

        <p>
          Get personalized trader recommendations based on performance, ratings
          and history.
        </p>

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

      {/* TRANSACTIONS LIST */}
      <div className={styles.mlSection}>
        <h2>📄 Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No Transactions Found</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className={styles.recCard}>
              <h3>
                {tx.crop} — ₹{tx.totalAmount}
              </h3>

              <p>Quantity: {tx.quantity} kg</p>

              <p>Trader ID: {tx.traderId}</p>

              <div className={styles.btnGroup}>
                <button
                  onClick={() => {
                    const slipHtml = `
                      <html>
                        <head>
                          <title>Transaction Slip</title>
                          <style>body{font-family:Arial;padding:20px}.card{border:1px solid #ddd;padding:20px;border-radius:8px}</style>
                        </head>
                        <body>
                          <div class="card">
                            <h2>Transaction Slip</h2>
                            <p><strong>ID:</strong> ${tx.id}</p>
                            <p><strong>Crop:</strong> ${tx.crop}</p>
                            <p><strong>Quantity:</strong> ${tx.quantity} kg</p>
                            <p><strong>Total:</strong> ₹${tx.totalAmount}</p>
                          </div>
                        </body>
                      </html>`;

                    const win = window.open("", "_blank");
                    win.document.write(slipHtml);
                    win.document.close();
                    win.focus();
                    win.print();
                  }}
                >
                  📄 Download Slip
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
