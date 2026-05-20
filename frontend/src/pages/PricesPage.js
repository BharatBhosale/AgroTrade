import styles from "./page.module.css";

const PricesPage = () => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← Real-Time Market Prices</h2>

      <div className={styles.notice}>
        Last Updated: 11:26 PM | Updated every 5 mins
      </div>

      <div className={styles.grid}>
        <div className={styles.priceCard}>
          <h3>Rice (Basmati)</h3>
          <p>₹45 per kg</p>
        </div>

        <div className={styles.priceCard}>
          <h3>Wheat</h3>
          <p>₹28 per kg</p>
        </div>

        <div className={styles.priceCard}>
          <h3>Tomato</h3>
          <p>₹35 per kg</p>
        </div>
      </div>

    </div>
  );
};

export default PricesPage;