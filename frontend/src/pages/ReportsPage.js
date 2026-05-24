import React, { useState } from "react";
import styles from "./page.module.css";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("monthly");
  const [reportData] = useState({
    totalTransactions: 12,
    totalAmount: 82900,
    averageTransaction: 6908,
    topTrader: "Raj Trading Co.",
    topCrop: "Rice",
    completedTransactions: 11,
    pendingTransactions: 1,
  });

  const handleGenerateReport = () => {
    alert(
      `✅ ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated!`,
    );
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>📊 Sales Reports</h2>

      {/* REPORT TYPE SELECTOR */}
      <div className={styles.filterBox}>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="weekly">Weekly Report</option>
          <option value="monthly">Monthly Report</option>
          <option value="yearly">Yearly Report</option>
        </select>
        <button className={styles.green} onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>

      {/* REPORT STATS */}
      <div className={styles.statsBox}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Total Transactions</p>
          <p className={styles.statValue}>{reportData.totalTransactions}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Total Amount</p>
          <p className={styles.statValue}>₹{reportData.totalAmount}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Average Transaction</p>
          <p className={styles.statValue}>₹{reportData.averageTransaction}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Completed</p>
          <p className={styles.statValue}>{reportData.completedTransactions}</p>
        </div>
      </div>

      {/* DETAILS */}
      <div className={styles.reportBox}>
        <h3>Report Summary</h3>
        <p>
          <strong>Top Trader:</strong> {reportData.topTrader}
        </p>
        <p>
          <strong>Most Traded Crop:</strong> {reportData.topCrop}
        </p>
        <p>
          <strong>Completed Transactions:</strong>{" "}
          {reportData.completedTransactions}
        </p>
        <p>
          <strong>Pending Transactions:</strong>{" "}
          {reportData.pendingTransactions}
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;
