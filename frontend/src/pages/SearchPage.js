import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

const parseCoordinate = (value) => {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; 
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

const SearchPage = ({ setNavSelection }) => {
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

  if (loading) {
    return (
      <div className={styles.page}>
        <p>Loading traders...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>🔍 Search Traders</h2>

      <p className={styles.found}>{locationMessage}</p>

      {farmerLocation && (
        <p className={styles.found}>
          Your location: {farmerLocation.latitude.toFixed(4)},{" "}
          {farmerLocation.longitude.toFixed(4)}
        </p>
      )}

      <div className={styles.filterBox}>
        <input
          placeholder="Search by crop (e.g. Rice, Wheat)"
          value={cropText}
          onChange={handleCropSearch}
        />
        <button onClick={handleFindTraders}>Search Traders</button>
        <button onClick={fetchTraders}>Refresh</button>
      </div>

      <div className={styles.filterBox}>
        <input
          placeholder="Your latitude"
          value={manualLatitude}
          onChange={(e) => setManualLatitude(e.target.value)}
        />
        <input
          placeholder="Your longitude"
          value={manualLongitude}
          onChange={(e) => setManualLongitude(e.target.value)}
        />
        <button onClick={handleLocationSubmit}>Use Location</button>
      </div>

      <p className={styles.found}>Found {filteredTraders.length} traders</p>

      <div className={styles.cardsGrid}>
        {filteredTraders.length > 0 ? (
          filteredTraders.map((trader) => (
            <div key={trader.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{trader.fullName}</h3>
                <span className={styles.rating}>⭐ {trader.rating || 0}</span>
              </div>

              <p className={styles.business}>{trader.business}</p>

              <p className={styles.location}>
                📍 {trader.address}, {trader.city}, {trader.state}
              </p>

              {trader.distanceKm != null && (
                <p className={styles.location}>
                  🧭 {trader.distanceKm.toFixed(1)} km away
                </p>
              )}

              {trader.crops && (
                <p className={styles.crops}>🌾 Crops: {getCropText(trader)}</p>
              )}

              <p className={styles.contact}>📞 {trader.phone}</p>

              <p className={styles.contact}>📧 {trader.email}</p>

              <div className={styles.actions}>
                <button className={styles.green}>Contact</button>
                <button className={styles.blue}>View Profile</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No traders found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
