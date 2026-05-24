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

  const [filteredFarmers, setFilteredFarmers] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState("requests");

  // LOAD DATA
  useEffect(() => {
    fetchDashboardData();

    fetchFarmerRequests();

    fetchTransactions();

    fetchReviews();
  }, []);

  // DASHBOARD
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/trader/dashboard/${user.id}`,
      );

      setDashboardData(response.data);
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

      setFarmerRequests(response.data || []);

      setFilteredFarmers(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/transactions/all",
      );

      setTransactions(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // REVIEWS
  const fetchReviews = async () => {

  try {

    const response =
      await axios.get(
        `http://localhost:8080/api/reviews/trader/${user.email}`
      );

    console.log(response.data);

    setReviews(
      response.data || []
    );

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

                <button
                  className={styles.contactBtn}
                  onClick={() => {

  localStorage.setItem(
    "selectedFarmer",
    JSON.stringify(farmer)
  );

  setNavSelection(
    "FarmerDetails"
  );

}}
                >
                  📞 Contact
                </button>
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
