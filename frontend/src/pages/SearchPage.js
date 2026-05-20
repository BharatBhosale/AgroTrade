import styles from "./page.module.css";

const SearchPage = ({ setNavSelection }) => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← Search Traders</h2>

      {/* FILTER */}
      <div className={styles.filterBox}>
        <input placeholder="e.g., Rice, Wheat, Vegetables" />
        <input type="range" />
        <button>Search</button>
      </div>

      <p className={styles.found}>Found 5 traders</p>

      {/* CARD */}
      <div className={styles.card}>
        <div>
          <h3>Raj Trading Co.</h3>
          <p>📍 Market Road, Delhi</p>
          <p>📞 +91-9876543210</p>
        </div>

        <div>
          <p>Specialty: Rice & Wheat</p>
          <p>Transactions: 156</p>
          <p>Distance: 2.3 km</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.green}>Contact Trader</button>
          <button className={styles.blue}>View Profile</button>
        </div>
      </div>

    </div>
  );
};

export default SearchPage;