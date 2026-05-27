import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const FarmerDashboard = ({ setNavSelection }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [connections, setConnections]
    = useState([]);

  // FETCH CONNECTIONS
  const fetchConnections = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/farmers/connections/${user.id}`
      );

      setConnections(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchConnections();

  }, []);

  return (
    <div className={styles.dashboard}>

      <h1 className={styles.title}>
        👨‍🌾 Farmer Dashboard
      </h1>

      {/* CONNECTED TRADERS */}
      <div className={styles.mlSection}>

        <h2>Connected Traders</h2>

        {connections.length === 0 ? (

          <p>No Connections Yet</p>

        ) : (

          connections.map((item) => (

            <div
              key={item.id}
              className={styles.recCard}
            >

              <h3>{item.traderName}</h3>

              <p>🌾 {item.crop}</p>

              <p>📍 {item.location}</p>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default FarmerDashboard;