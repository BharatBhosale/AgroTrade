import styles from "./page.module.css";

const ReportsPage = () => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← Reports</h2>

      <div className={styles.filterBox}>
        <select>
          <option>Monthly</option>
        </select>

        <button className={styles.green}>Generate</button>
      </div>

      <div className={styles.reportBox}>
        <p>Total: ₹67,400</p>
      </div>

    </div>
  );
};

export default ReportsPage;