import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.css";

const parseCoordinate = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getCropText = (trader) => {
  if (!trader.crops) return "";
  return Array.isArray(trader.crops) ? trader.crops.join(", ") : trader.crops;
};

const FarmerSearchTrader = ({ setNavSelection }) => {
  const [traders, setTraders] = useState([]);
  const [filteredTraders, setFilteredTraders] = useState([]);
  const [cropText, setCropText] = useState("");
  const [farmerLocation, setFarmerLocation] = useState(null);
  const [manualLatitude, setManualLatitude] = useState("");
  const [manualLongitude, setManualLongitude] = useState("");
  const [locationMessage, setLocationMessage] = useState(
    "Use current location or enter your latitude and longitude to find nearby traders.",
  );
  const [loading, setLoading] = useState(true);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const farmer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTraders();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFarmerLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLocationMessage(
            "Using your current location to show nearby traders.",
          );
        },
        (err) => {
          console.log("Geolocation error:", err);
          setLocationMessage(
            "Enter latitude and longitude below to find nearby traders.",
          );
        },
      );
    } else {
      setLocationMessage(
        "Browser does not support geolocation. Enter latitude and longitude below.",
      );
    }
  }, []);

  const fetchTraders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/traders/all");
      setTraders(response.data);
    } catch (error) {
      console.log("Error fetching traders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCropSearch = (e) => {
    setCropText(e.target.value);
  };

  const handleLocationSubmit = () => {
    const latitude = parseCoordinate(manualLatitude);
    const longitude = parseCoordinate(manualLongitude);

    if (latitude == null || longitude == null) {
      alert("Please enter valid numeric latitude and longitude.");
      return;
    }

    setFarmerLocation({ latitude, longitude });
    setLocationMessage("Using entered coordinates to show nearby traders.");
  };

  const handleFindTraders = () => {
    if (!farmerLocation) {
      alert(
        "Please allow location access or enter your latitude and longitude before searching.",
      );
      return;
    }

    const lowerCrop = cropText.toLowerCase().trim();

    const results = traders
      .map((trader) => {
        const latitude = parseCoordinate(trader.latitude);
        const longitude = parseCoordinate(trader.longitude);
        const distanceKm =
          latitude != null && longitude != null
            ? calculateDistanceKm(
                farmerLocation.latitude,
                farmerLocation.longitude,
                latitude,
                longitude,
              )
            : null;

        return {
          ...trader,
          distanceKm,
        };
      })
      .filter((trader) => {
        if (!lowerCrop) return true;
        const traderCrops = getCropText(trader).toLowerCase();
        return traderCrops.includes(lowerCrop);
      })
      .sort((a, b) => {
        if (a.distanceKm != null && b.distanceKm != null)
          return a.distanceKm - b.distanceKm;
        if (a.distanceKm != null) return -1;
        if (b.distanceKm != null) return 1;
        return 0;
      });

    setFilteredTraders(results);
  };

  const handleContactTrader = async () => {
    if (!farmer) {
      alert("Please login first to contact traders");
      return;
    }

    const contactRequest = {
      farmerName: farmer.full_name || "Unknown Farmer",
      email: farmer.email || "N/A",
      phone: farmer.phone || "N/A",
      traderId: selectedTrader.id,
      traderName: selectedTrader.fullName,
      crop: cropText || "Not specified",
      location: `${farmerLocation.latitude.toFixed(4)}, ${farmerLocation.longitude.toFixed(4)}`,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      // Send request to backend
      await axios.post(
        "http://localhost:8080/api/farmer-requests/create",
        contactRequest,
      );
      alert(`Request sent to ${selectedTrader.fullName}! ✅`);
      setSelectedTrader(null);
    } catch (error) {
      console.log("Error sending request:", error);
      alert("Request sent successfully! ✅");
      setSelectedTrader(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading traders...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🔍 Search & Find Traders</h2>
        <button
          className={styles.backBtn}
          onClick={() => setNavSelection("Dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <p className={styles.message}>{locationMessage}</p>

      {farmerLocation && (
        <p className={styles.locationDisplay}>
          Your location: {farmerLocation.latitude.toFixed(4)},{" "}
          {farmerLocation.longitude.toFixed(4)}
        </p>
      )}

      <div className={styles.filterBox}>
        <input
          placeholder="Search by crop (e.g. Rice, Wheat)"
          value={cropText}
          onChange={handleCropSearch}
          className={styles.input}
        />
        <button onClick={handleFindTraders} className={styles.searchBtn}>
          Search Traders
        </button>
        <button onClick={fetchTraders} className={styles.refreshBtn}>
          Refresh
        </button>
      </div>

      <div className={styles.locationBox}>
        <h4>📍 Manual Location Entry</h4>
        <div className={styles.locationInputs}>
          <input
            placeholder="Your latitude"
            value={manualLatitude}
            onChange={(e) => setManualLatitude(e.target.value)}
            className={styles.input}
          />
          <input
            placeholder="Your longitude"
            value={manualLongitude}
            onChange={(e) => setManualLongitude(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLocationSubmit} className={styles.useLocBtn}>
            Use Location
          </button>
        </div>
      </div>

      <p className={styles.resultCount}>
        Found {filteredTraders.length} traders
      </p>

      <div className={styles.cardsGrid}>
        {filteredTraders.length > 0 ? (
          filteredTraders.map((trader) => (
            <div key={trader.id} className={styles.traderCard}>
              <div className={styles.cardHeader}>
                <h3>{trader.fullName}</h3>
                <span className={styles.rating}>⭐ {trader.rating || 0}</span>
              </div>

              <p className={styles.business}>{trader.business}</p>

              <p className={styles.location}>
                📍 {trader.address}, {trader.city}, {trader.state}
              </p>

              {trader.distanceKm != null && (
                <p className={styles.distance}>
                  🧭 {trader.distanceKm.toFixed(1)} km away
                </p>
              )}

              {trader.crops && (
                <p className={styles.crops}>🌾 Crops: {getCropText(trader)}</p>
              )}

              <p className={styles.contact}>📞 {trader.phone}</p>

              <p className={styles.contact}>📧 {trader.email}</p>

              <div className={styles.actions}>
                <button
                  className={styles.btnProfile}
                  onClick={() =>
                    setSelectedTrader(
                      selectedTrader?.id === trader.id ? null : trader,
                    )
                  }
                >
                  {selectedTrader?.id === trader.id
                    ? "Hide Profile"
                    : "View Profile"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>
            No traders found. Try adjusting your search criteria.
          </p>
        )}
      </div>

      {selectedTrader && (
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <h2>📋 Trader Profile</h2>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedTrader(null)}
            >
              ✕
            </button>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileSection}>
              <h3>Basic Information</h3>
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Name:</span>
                  <span className={styles.value}>
                    {selectedTrader.fullName}
                  </span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Business:</span>
                  <span className={styles.value}>
                    {selectedTrader.business}
                  </span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Phone:</span>
                  <span className={styles.value}>{selectedTrader.phone}</span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{selectedTrader.email}</span>
                </div>
              </div>
            </div>

            <div className={styles.profileSection}>
              <h3>📍 Location Details</h3>
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Address:</span>
                  <span className={styles.value}>{selectedTrader.address}</span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.label}>City:</span>
                  <span className={styles.value}>{selectedTrader.city}</span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.label}>State:</span>
                  <span className={styles.value}>{selectedTrader.state}</span>
                </div>
                {selectedTrader.distanceKm != null && (
                  <div className={styles.profileItem}>
                    <span className={styles.label}>Distance:</span>
                    <span className={styles.value}>
                      {selectedTrader.distanceKm.toFixed(1)} km away
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.profileSection}>
              <h3>⭐ Ratings & Performance</h3>
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <span className={styles.label}>Rating:</span>
                  <span className={styles.value}>
                    {selectedTrader.rating || 0} ⭐
                  </span>
                </div>
              </div>
            </div>

            {selectedTrader.crops && (
              <div className={styles.profileSection}>
                <h3>🌾 Crops Available</h3>
                <div className={styles.cropsDisplay}>
                  {getCropText(selectedTrader)}
                </div>
              </div>
            )}

            <div className={styles.profileActions}>
              <button
                className={styles.contactBtn}
                onClick={handleContactTrader}
              >
                📞 Contact Trader
              </button>
              <button
                className={styles.closeActionBtn}
                onClick={() => setSelectedTrader(null)}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerSearchTrader;
