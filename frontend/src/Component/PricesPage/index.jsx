import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const PricesPage = ({ setNavSelection }) => {

  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:8080/api/market/prices"
      );

      console.log(response.data);

      // FILTER ONLY MAHARASHTRA
      const maharashtraData =
        response.data.records.filter(
          (item) =>
            item.state === "Maharashtra"
        );

      // FORMAT DATA
const formattedData =
  response.data.records.map((item, index) => ({

    id: index + 1,

    crop: item.commodity,

    market: item.market,

    district: item.district,

    state: item.state,

    // QUINTAL TO KG
    price:
      (
        parseFloat(item.modal_price) / 100
      ).toFixed(2),

    minPrice:
      (
        parseFloat(item.min_price) / 100
      ).toFixed(2),

    maxPrice:
      (
        parseFloat(item.max_price) / 100
      ).toFixed(2),

    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",

}));

      setPrices(formattedData);

    } catch (error) {

      console.log("ERROR:", error);

      alert("Failed To Fetch Prices ❌");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className={styles.loading}>
        <h2>Loading Real Market Prices...</h2>
      </div>
    );

  }

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>

        <h1 className={styles.title}>
          💹 Maharashtra Market Prices
        </h1>

        <button
          className={styles.backBtn}
          onClick={() =>
            setNavSelection("Dashboard")
          }
        >
          ← Back Dashboard
        </button>

      </div>

      {/* REFRESH BUTTON */}
      <button
        className={styles.refreshBtn}
        onClick={fetchPrices}
      >
        🔄 Refresh Prices
      </button>

      {/* GRID */}
      <div className={styles.grid}>

        {prices.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.crop}
              className={styles.image}
            />

            {/* TITLE */}
            <h2>{item.crop}</h2>

            {/* DETAILS */}
            <p>
              <strong>Market:</strong>
              {" "}
              {item.market}
            </p>

            <p>
              <strong>District:</strong>
              {" "}
              {item.district}
            </p>

            <p>
              <strong>State:</strong>
              {" "}
              {item.state}
            </p>

            {/* PRICE */}
            <div className={styles.priceBox}>

              <h1 className={styles.price}>
                ₹{item.price} / KG
              </h1>

              <p className={styles.modal}>
                Current Market Price
              </p>

            </div>

            {/* MIN MAX */}
            <div className={styles.bottom}>

              <p className={styles.min}>
                Min: ₹{item.minPrice}
              </p>

              <p className={styles.max}>
                Max: ₹{item.maxPrice}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PricesPage;