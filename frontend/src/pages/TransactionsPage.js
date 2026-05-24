import React, { useState } from "react";
import styles from "./page.module.css";

const TransactionsPage = () => {
  const [transactions] = useState([
    {
      id: "TXN001",
      date: "2026-05-15",
      trader: "Raj Trading Co.",
      crop: "Rice",
      quantity: "100 kg",
      amount: "₹4,500",
      status: "Completed",
    },
    {
      id: "TXN002",
      date: "2026-05-14",
      trader: "Sharma Traders",
      crop: "Wheat",
      quantity: "50 kg",
      amount: "₹1,400",
      status: "Completed",
    },
    {
      id: "TXN003",
      date: "2026-05-12",
      trader: "Delhi Wholesale",
      crop: "Tomato",
      quantity: "200 kg",
      amount: "₹7,000",
      status: "Completed",
    },
    {
      id: "TXN004",
      date: "2026-05-10",
      trader: "Punjab Agro",
      crop: "Onion",
      quantity: "80 kg",
      amount: "₹3,200",
      status: "Pending",
    },
  ]);

  const totalAmount = transactions
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + parseInt(t.amount.replace("₹", "")), 0);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>📝 Transaction History</h2>

      {/* STATS */}
      <div className={styles.statsBox}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Total Transactions</p>
          <p className={styles.statValue}>{transactions.length}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Total Amount</p>
          <p className={styles.statValue}>₹{totalAmount}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Completed</p>
          <p className={styles.statValue}>
            {transactions.filter((t) => t.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Trader</th>
              <th>Crop</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td className={styles.txnId}>{txn.id}</td>
                <td>{txn.date}</td>
                <td>{txn.trader}</td>
                <td>{txn.crop}</td>
                <td>{txn.quantity}</td>
                <td className={styles.amount}>{txn.amount}</td>
                <td>
                  <span
                    className={
                      txn.status === "Completed"
                        ? styles.statusCompleted
                        : styles.statusPending
                    }
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
