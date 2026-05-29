import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import styles from "./style.module.css";

const TraderDashboard = ({ setNavSelection }) => {
  // Safe parsing with fallback to prevent crashes if localStorage is empty
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")) || {}, []);

  const [dashboardData, setDashboardData] = useState({
    totalTransactions: 0,
    activeFarmers: 0,
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

  // DASHBOARD DATA FETCH
  const fetchDashboardData = useCallback(async () => {
    if (!user.id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/trader/${user.id}`
      );
      setDashboardData({
        totalTransactions: response.data.totalTransactions || 0,
        activeFarmers: response.data.activeConnections || 0,
        monthlyRevenue: response.data.monthlyIncome || 0,
      });
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    }
  }, [user.id]);

  // FARMER REQUESTS FETCH
  const fetchFarmerRequests = useCallback(async () => {
    if (!user.id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/farmer-requests/trader/${user.id}`
      );
      const data = Array.isArray(response.data) ? response.data : [];
      setFarmerRequests(data);
      setFilteredFarmers(data);
    } catch (error) {
      console.error("Farmer Requests Fetch Error:", error);
    }
  }, [user.id]);

  // TRANSACTIONS FETCH
  const fetchTransactions = useCallback(async () => {
    if (!user.email) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/trader/email/${user.email}`
      );
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Transactions Fetch Error:", error);
    }
  }, [user.email]);

  // REVIEWS FETCH
  const fetchReviews = useCallback(async () => {
    if (!user.email) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reviews/trader/${user.email}`
      );
      setReviews(response.data || []);
    } catch (error) {
      console.error("Reviews Fetch Error:", error);
    }
  }, [user.email]);

  // COMBINED POLLING ACTION
  const fetchAllData = useCallback(() => {
    fetchDashboardData();
    fetchTransactions();
    fetchReviews();
  }, [fetchDashboardData, fetchTransactions, fetchReviews]);

  // LOAD DATA ON INITIALIZATION & START AUTOMATIC 2s INTERVAL REFRESH LOOP
  useEffect(() => {
    fetchAllData();
    fetchFarmerRequests();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchAllData, fetchFarmerRequests]);

  // Refresh farmer requests whenever Requests tab is clicked active
  useEffect(() => {
    if (activeTab === "requests") fetchFarmerRequests();
  }, [activeTab, fetchFarmerRequests]);

  // 🔥 LIVE MATH MEMO: Calculate real average rating dynamically from review array state
  const realAverageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return "0.0";
    const totalRatingSum = reviews.reduce((sum, item) => sum + (item.rating || 0), 0);
    const average = totalRatingSum / reviews.length;
    return average.toFixed(1); 
  }, [reviews]);

  // FORMAT UTILITIES
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const formatDate = (value) => {
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "N/A";
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      const leftDate = new Date(a.transactionDate || a.createdAt || 0).getTime();
      const rightDate = new Date(b.transactionDate || b.createdAt || 0).getTime();
      return rightDate - leftDate;
    });
  }, [transactions]);

  // SEARCH FILTER HANDLER
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = farmerRequests.filter(
      (farmer) =>
        farmer.farmerName?.toLowerCase().includes(query.toLowerCase()) ||
        farmer.crop?.toLowerCase().includes(query.toLowerCase()) ||
        farmer.location?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFarmers(filtered);
  };

  // SECURE IFRAME PRINT ACTION (No Popup-Blocker Bugs)
  const printTransactionSlip = (tx) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.write(`
      <html>
        <head>
          <title>Transaction Slip</title>
          <style>
            body{font-family: Arial, sans-serif; margin:0; padding:24px; color:#1f2937; background:#fff;}
            .card{border:1px solid #d1d5db; border-radius:12px; padding:24px; box-shadow:0 10px 24px rgba(0,0,0,0.08);}
            .header{display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #16a34a; padding-bottom:12px; margin-bottom:18px;}
            .brand h1{margin:0; color:#166534; font-size:26px;}
            .brand p{margin:4px 0 0; color:#6b7280; font-size:12px;}
            .metaRow{display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:12px; margin:16px 0;}
            .metaBox{background:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; padding:12px;}
            .label{display:block; text-transform:uppercase; letter-spacing:0.08em; color:#6b7280; font-size:10px; margin-bottom:5px;}
            .value{font-size:15px; font-weight:700; color:#111827;}
            .summary{margin-top:16px; padding-top:12px; border-top:1px dashed #d1d5db; display:flex; justify-content:space-between; align-items:center; gap:12px;}
            .summary strong{font-size:20px; color:#166534;}
            .note{margin-top:14px; color:#6b7280; font-size:11px;}
            h2{color:#27ae60; margin:0;}
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="brand">
                <h1>AgroTrade Trader Slip</h1>
                <p>Printed on ${new Date().toLocaleString("en-IN")}</p>
              </div>
              <div>
                <h2>Transaction Slip</h2>
                <p><strong>Transaction ID:</strong> ${tx.id}</p>
              </div>
            </div>
            <div class="metaRow">
              <div class="metaBox">
                <span class="label">Farmer Name</span>
                <div class="value">${tx.farmerName || `Farmer ${tx.farmerId}`}</div>
              </div>
              <div class="metaBox">
                <span class="label">Trader Name</span>
                <div class="value">${tx.traderName || user?.name || user?.email}</div>
              </div>
              <div class="metaBox">
                <span class="label">Transaction Date</span>
                <div class="value">${formatDate(tx.transactionDate)}</div>
              </div>
            </div>
            <p><strong>Crop:</strong> ${tx.crop}</p>
            <p><strong>Quantity:</strong> ${tx.quantity} kg</p>
            <p><strong>Rate:</strong> ${formatCurrency(tx.rate)}</p>
            <p><strong>Base Amount:</strong> ${formatCurrency(tx.baseAmount)}</p>
            <p><strong>Charges:</strong> ${formatCurrency(tx.charges)}</p>
            <p><strong>Cut:</strong> ${formatCurrency(tx.cut)}</p>
            <div class="summary">
              <div>
                <p style="margin:0; color:#6b7280; font-size:12px;">Total Settlement</p>
                <p style="margin:4px 0 0; color:#4b5563; font-size:12px;">Includes all deductions and charges</p>
              </div>
              <strong>${formatCurrency(tx.totalAmount)}</strong>
            </div>
            <div class="note">This trader transaction slip is generated electronically for settlement and record keeping.</div>
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 400);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>🏪 Trader Dashboard</h1>

      {/* TOP CARDS */}
      <div className={styles.stats}>
        <div className={styles.card}>
          <p>Total Transactions</p>
          <h2>{transactions.length}</h2>
        </div>

        <div className={styles.card}>
          <p>Active Farmers</p>
          <h2>{dashboardData.activeFarmers}</h2>
        </div>

        <div className={styles.card}>
          <p>Average Rating</p>
          {/* 🔥 Displays precise computed value from live reviews array */}
          <h2>⭐ {realAverageRating}</h2> 
        </div>

        <div className={styles.card}>
          <p>This Month Revenue</p>
          <h2>{formatCurrency(dashboardData.monthlyRevenue)}</h2>
        </div>
      </div>

      {/* TABS CONTROLLER */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "requests" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          📋 Farmer Requests
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "transactions" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("transactions")}
        >
          💳 Transactions
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "search" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("search")}
        >
          🔍 Search Farmers
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTab : ""}`}
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
              <div
                key={farmer.id}
                className={
                  localStorage.getItem(`contacted_${farmer.id}`) === "true"
                    ? `${styles.requestCard} ${styles.disabledCard}`
                    : styles.requestCard
                }
              >
                <h3>{farmer.farmerName}</h3>
                <p>🌾 {farmer.crop}</p>
                <p>📍 {farmer.location}</p>

                <div className={styles.btnGroup}>
                  {!acceptedRequests.includes(farmer.id) && (
                    <button
                      className={styles.acceptBtn}
                      onClick={async () => {
                        try {
                          await axios.post(`http://localhost:8080/api/farmer-requests/${farmer.id}/accept`);
                          setAcceptedRequests((prev) => [...prev, farmer.id]);
                          setDashboardData((prev) => ({
                            ...prev,
                            activeFarmers: prev.activeFarmers + 1,
                          }));
                          alert("Request Accepted ✅");
                        } catch (error) {
                          alert("Error processing accept pipeline.");
                        }
                      }}
                    >
                      ✅ Accept
                    </button>
                  )}

                  {!rejectedRequests.includes(farmer.id) && (
                    <button
                      className={styles.rejectBtn}
                      onClick={async () => {
                        try {
                          await axios.post(`http://localhost:8080/api/farmer-requests/${farmer.id}/reject`);
                          setRejectedRequests((prev) => [...prev, farmer.id]);
                          alert("Request Rejected ❌");
                        } catch (error) {
                          alert("Error processing rejection pipeline.");
                        }
                      }}
                    >
                      ❌ Reject
                    </button>
                  )}

                  <button
                    className={localStorage.getItem(`contacted_${farmer.id}`) === "true" ? styles.disabledBtn : styles.contactBtn}
                    disabled={localStorage.getItem(`contacted_${farmer.id}`) === "true"}
                    onClick={() => {
                      localStorage.setItem(`contacted_${farmer.id}`, "true");
                      localStorage.setItem("selectedFarmer", JSON.stringify(farmer));
                      setNavSelection("Transaction");
                    }}
                  >
                    {localStorage.getItem(`contacted_${farmer.id}`) === "true" ? "✅ Connected" : "📞 Contact"}
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
            <div className={styles.transactionsList}>
              {sortedTransactions.map((tx) => (
                <div key={tx.id} className={styles.txCard}>
                  <div className={styles.txTop}>
                    <h3>{tx.crop} — {formatCurrency(tx.totalAmount)}</h3>
                    <span className={styles.status}>{tx.status}</span>
                  </div>
                  <div className={styles.txBody}>
                    <p><strong>Farmer:</strong> {tx.farmerName || `Farmer ${tx.farmerId}`}</p>
                    <p><strong>Trader:</strong> {tx.traderName || user?.name || user?.email}</p>
                    <p><strong>Date:</strong> {formatDate(tx.transactionDate)}</p>
                    <p><strong>Quantity:</strong> {tx.quantity} kg</p>
                    <p><strong>Transaction ID:</strong> {tx.id}</p>
                  </div>
                  {/* 🔥 Fixed Print Pipeline Action execution link context */}
                  <button className={styles.downloadBtn} onClick={() => printTransactionSlip(tx)}>
                    🖨️ Print Slip
                  </button>
                </div>
              ))}
            </div>
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