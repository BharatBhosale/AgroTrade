import styles from "./page.module.css";

const TransactionsPage = () => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← Transaction History</h2>

      <div className={styles.stats}>
        <div>6 Transactions</div>
        <div>₹82,900 Total</div>
        <div>₹67,400 This Month</div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Trader</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>TXN001</td>
            <td>2026-04-05</td>
            <td>Raj Trading</td>
            <td>₹15,000</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default TransactionsPage;