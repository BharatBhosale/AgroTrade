import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";

const TransactionsPage = ({ setNavSelection }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [transactions, setTransactions]
    = useState([]);

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/transactions/farmer/email/${user.email}`
      );

      console.log(response.data);

      setTransactions(response.data);

    } catch (error) {

      console.log(
        "Transaction Error:",
        error
      );

    }
  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  return (

    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>

        <button
          className={styles.backBtn}
          onClick={() =>
            setNavSelection("Dashboard")
          }
        >
          ← Back
        </button>

        <h1 className={styles.title}>
          📄 Farmer Transaction History
        </h1>

      </div>

      {transactions.length === 0 ? (

        <div className={styles.noData}>
          No Transactions Found
        </div>

      ) : (

        <div className={styles.tableWrapper}>

          <table className={styles.table}>

            <thead>

              <tr>

                <th>Crop</th>

                <th>Farmer</th>

                <th>Farmer Email</th>

                <th>Trader</th>

                <th>Trader Email</th>

                <th>Quantity</th>

                <th>Rate</th>

                <th>Charges</th>

                <th>Cut</th>

                <th>Total</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((item) => (

                <tr key={item.id}>

                  <td>{item.crop}</td>

                  <td>{item.farmerName}</td>

                  <td>{item.farmerEmail}</td>

                  <td>{item.traderName}</td>

                  <td>{item.traderEmail}</td>

                  <td>{item.quantity} kg</td>

                  <td>₹{item.rate}</td>

                  <td>₹{item.charges}</td>

                  <td>₹{item.cut}</td>

                  <td className={styles.total}>
                    ₹{item.totalAmount}
                  </td>

                  <td>{item.status}</td>

                  <td>{item.transactionDate}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default TransactionsPage;