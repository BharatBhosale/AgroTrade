import React, { useEffect, useState } from "react";

import axios from "axios";

import styles from "./style.module.css";

const TraderDashboard = ({ setNavSelection }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,

    activeFarmers: 0,

    averageRating: 0,

    monthlyRevenue: 0,
  });

  const [farmerRequests, setFarmerRequests] = useState([]);

  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const [rejectedRequests, setRejectedRequests] = useState([]);

  const [filteredFarmers, setFilteredFarmers] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState("requests");

  // LOAD DATA
  useEffect(() => {
    // FIRST LOAD
    fetchDashboardData();

    fetchFarmerRequests();

    fetchTransactions();

    fetchReviews();

    // AUTO REFRESH EVERY 2 SEC
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 2000);

    // CLEANUP
    return () => clearInterval(interval);
  }, []);

  // Refresh farmer requests whenever Requests tab is active
  useEffect(() => {
    if (activeTab === "requests") fetchFarmerRequests();
  }, [activeTab]);

  // DASHBOARD
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/trader/${user.id}`,
      );

      setDashboardData({
        totalTransactions: response.data.totalTransactions || 0,
        activeFarmers: response.data.activeConnections || 0,
        averageRating: response.data.averageRating || 0,
        monthlyRevenue: response.data.monthlyIncome || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // FARMER REQUESTS
  const fetchFarmerRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/farmer-requests/trader/${user.id}`,
      );

      console.log("fetchFarmerRequests response:", response.data);

      const data = Array.isArray(response.data) ? response.data : [];

      setFarmerRequests(data);

      setFilteredFarmers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/trader/${user.id}`,
      );

      console.log("fetchTransactions response:", response.data);

      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // REVIEWS
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reviews/trader/${user.email}`,
      );

      console.log(response.data);

      setReviews(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = farmerRequests.filter(
      (farmer) =>
        farmer.farmerName?.toLowerCase().includes(query.toLowerCase()) ||
        farmer.crop?.toLowerCase().includes(query.toLowerCase()) ||
        farmer.location?.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredFarmers(filtered);
  };

  // CONTACT
  const handleContactFarmer = (farmer) => {
    alert(`

Farmer Name:
${farmer.farmerName}

Email:
${farmer.email}

Phone:
${farmer.phone}

Crop:
${farmer.crop}

Location:
${farmer.location}

    `);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>🏪 Trader Dashboard</h1>

      {/* TOP CARDS */}
      <div className={styles.stats}>
        <div className={styles.card}>
          <p>Total Transactions</p>

          <h2>{dashboardData.totalTransactions}</h2>
        </div>

        <div className={styles.card}>
          <p>Active Farmers</p>

          <h2>{dashboardData.activeFarmers}</h2>
        </div>

        <div className={styles.card}>
          <p>Average Rating</p>

          <h2>{dashboardData.averageRating}</h2>
        </div>

        <div className={styles.card}>
          <p>This Month Revenue</p>

          <h2>₹{dashboardData.monthlyRevenue}</h2>
        </div>
      </div>

      {/* BUTTONS */}
      <div className={styles.tabs}>
        <button
          className={styles.tabBtn}
          onClick={() => setActiveTab("requests")}
        >
          📋 Farmer Requests
        </button>

        <button
          className={styles.tabBtn}
          onClick={() => setActiveTab("transactions")}
        >
          💳 Transactions
        </button>

        <button
          className={styles.tabBtn}
          onClick={() => setActiveTab("search")}
        >
          🔍 Search Farmers
        </button>

        <button
          className={styles.tabBtn}
          onClick={() => setActiveTab("reviews")}
        >
          ⭐ View Reviews
        </button>
      </div>

      {/* REQUEST TAB */}
      {activeTab === "requests" && (
        <div className={styles.section}>
          <h2>Farmer Requests</h2>

          {farmerRequests.length === 0 ? (
            <p>No Requests Found</p>
          ) : (
            farmerRequests.map((farmer) => (
              <div key={farmer.id} className={styles.requestCard}>
                <h3>{farmer.farmerName}</h3>

                <p>🌾 {farmer.crop}</p>

                <p>📍 {farmer.location}</p>

                <div className={styles.btnGroup}>
                  {/* ACCEPT BUTTON HIDE AFTER ACCEPT */}
                  {!acceptedRequests.includes(farmer.id) && (
                    <button
                      className={styles.acceptBtn}
                      onClick={async () => {
                        try {
                          // ACCEPT REQUEST
                          await axios.post(
                            `http://localhost:8080/api/farmer-requests/${farmer.id}/accept`,
                          );

                          // HIDE ONLY ACCEPT BUTTON
                          setAcceptedRequests((prev) => [...prev, farmer.id]);

                          // REFRESH DASHBOARD
                          setDashboardData((prev) => ({
                            ...prev,
                            activeFarmers: prev.activeFarmers + 1,
                          }));

                          alert("Request Accepted ✅");
                        } catch (error) {
                          console.error(
                            "Accept Error:",
                            error.response?.data || error.message,
                          );

                          alert(
                            "Error: " +
                              (error.response?.data?.message || error.message),
                          );
                        }
                      }}
                    >
                      ✅ Accept
                    </button>
                  )}

                  {/* REJECT BUTTON HIDE AFTER REJECT */}
                  {!rejectedRequests.includes(farmer.id) && (
                    <button
                      className={styles.rejectBtn}
                      onClick={async () => {
                        try {
                          // REJECT REQUEST
                          await axios.post(
                            `http://localhost:8080/api/farmer-requests/${farmer.id}/reject`,
                          );

                          // HIDE ONLY REJECT BUTTON
                          setRejectedRequests((prev) => [...prev, farmer.id]);

                          // REFRESH DASHBOARD
                          await fetchDashboardData();

                          alert("Request Rejected ❌");
                        } catch (error) {
                          console.error(
                            "Reject Error:",
                            error.response?.data || error.message,
                          );

                          alert(
                            "Error: " +
                              (error.response?.data?.message || error.message),
                          );
                        }
                      }}
                    >
                      ❌ Reject
                    </button>
                  )}

                  {/* CONTACT BUTTON ALWAYS SHOW */}
                  <button
                    className={styles.contactBtn}
                    onClick={() => {
                      localStorage.setItem(
                        "selectedFarmer",
                        JSON.stringify(farmer),
                      );

                      setNavSelection("Transaction");
                    }}
                  >
                    📞 Contact
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TRANSACTIONS TAB */}
      {activeTab === "transactions" && (
        <div className={styles.section}>
          <h2>Transactions</h2>

          {transactions.length === 0 ? (
            <p>No Transactions Found</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className={styles.txCard}>
                <h3>
                  {tx.crop} — ₹{tx.totalAmount}
                </h3>

                <p>Quantity: {tx.quantity} kg</p>

                <p>Farmer ID: {tx.farmerId}</p>

                <p>Status: {tx.status}</p>

                <div className={styles.btnGroup}>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => {
                      const slipHtml = `
                        <html>
                          <head>
                            <title>Transaction Slip</title>
                            <style>
                              body{font-family: Arial, sans-serif; padding:20px}
                              .card{border:1px solid #ddd;padding:20px;border-radius:8px}
                              h2{color:#27ae60}
                            </style>
                          </head>
                          <body>
                            <div class="card">
                              <h2>Transaction Slip</h2>
                              <p><strong>Transaction ID:</strong> ${tx.id}</p>
                              <p><strong>Crop:</strong> ${tx.crop}</p>
                              <p><strong>Quantity:</strong> ${tx.quantity} kg</p>
                              <p><strong>Rate:</strong> ₹${tx.rate}</p>
                              <p><strong>Base Amount:</strong> ₹${tx.baseAmount}</p>
                              <p><strong>Charges:</strong> ₹${tx.charges}</p>
                              <p><strong>Cut:</strong> ₹${tx.cut}</p>
                              <h3>Total: ₹${tx.totalAmount}</h3>
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
                    📄 Download PDF
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SEARCH TAB */}
      {activeTab === "search" && (
        <div className={styles.section}>
          <h2>Search Farmers</h2>

          <input
            type="text"
            placeholder="Search Farmers..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />

          {filteredFarmers.map((farmer) => (
            <div key={farmer.id} className={styles.farmerCard}>
              <h3>{farmer.farmerName}</h3>

              <p>🌾 {farmer.crop}</p>

              <p>📍 {farmer.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* REVIEW TAB */}
      {activeTab === "reviews" && (
        <div className={styles.section}>
          <h2>⭐ Farmer Reviews</h2>

          {reviews.length === 0 ? (
            <p>No Reviews Found</p>
          ) : (
            reviews.map((item) => (
              <div key={item.id} className={styles.reviewCard}>
                <h3>👨‍🌾 {item.farmerName}</h3>

                <p>Rating: {"⭐".repeat(item.rating)}</p>

                <p>{item.reviewText}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TraderDashboard;
