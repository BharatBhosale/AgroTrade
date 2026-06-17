import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import styles from "./style.module.css";

const ReportsPage = ({ setNavSelection }) => {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    if (!user.email) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/farmer/email/${user.email}`
      );
      setTransactions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Transaction Error:", error);
    } finally {
      setLoading(false);
    }
  }, [user.email]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.transactionDate) - new Date(a.transactionDate);
    });
  }, [transactions]);

  
  const downloadSingleTransaction = (tx) => {
    const receiptText = `
=========================================
       FARMER TRANSACTION RECEIPT        
=========================================
Date: ${tx.transactionDate || "N/A"}
Status: ${tx.status || "N/A"}
-----------------------------------------
CROP DETAILS:
Crop Type: ${tx.crop || "N/A"}
Quantity: ${tx.quantity || 0} kg
Rate: ₹${tx.rate || 0} per kg

PARTNERS:
Farmer Name: ${tx.farmerName || "N/A"}
Farmer Email: ${tx.farmerEmail || "N/A"}
Trader Name: ${tx.traderName || tx.traderEmail || "N/A"}
Trader Email: ${tx.traderEmail || "N/A"}

BREAKDOWN:
Base Amount: ₹${(tx.quantity || 0) * (tx.rate || 0)}
Market Charges: ₹${tx.charges || 0}
Commission/Cut: ₹${tx.cut || 0}
-----------------------------------------
TOTAL PAID: ₹${tx.totalAmount || 0}
=========================================
Thank you for using our Agri-Platform!
`;

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Receipt_${tx.crop || "Crop"}_${tx.transactionDate || "Date"}.txt`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  const printSingleTransaction = (tx) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.write(`
      <html>
        <head>
          <title>Transaction Receipt</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #333; }
            .receipt-box { max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 24px; border-radius: 8px; }
            h2 { text-align: center; color: #2e7d32; margin-bottom: 20px; border-bottom: 2px solid #2e7d32; padding-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            td { padding: 10px 4px; border-bottom: 1px solid #eee; font-size: 14px; }
            .bold { font-weight: bold; color: #555; }
            .total-row { font-size: 16px; color: #2e7d32; background: #f5f5f5; font-weight: bold; }
            .total-row td { padding: 12px 6px; }
            .status { text-align: center; margin-top: 20px; font-weight: bold; color: #1b5e20; }
          </style>
        </head>
        <body>
          <div class="receipt-box">
            <h2>TRANSACTION INVOICE</h2>
            <p><strong>Date:</strong> ${tx.transactionDate || "N/A"}</p>
            <p><strong>Status:</strong> ${tx.status || "N/A"}</p>
            <hr />
            <table>
              <tr><td class="bold">Crop Type</td><td>🌾 ${tx.crop || "N/A"}</td></tr>
              <tr><td class="bold">Quantity</td><td>${tx.quantity || 0} kg</td></tr>
              <tr><td class="bold">Rate per kg</td><td>₹${tx.rate || 0}/kg</td></tr>
              <tr><td class="bold">Farmer Name</td><td>${tx.farmerName || "N/A"}</td></tr>
              <tr><td class="bold">Trader Email</td><td>${tx.traderEmail || "N/A"}</td></tr>
              <tr><td class="bold">Market Charges</td><td>₹${tx.charges || 0}</td></tr>
              <tr><td class="bold">Trader Cut</td><td>₹${tx.cut || 0}</td></tr>
              <tr class="total-row"><td class="bold">Grand Total</td><td>₹${tx.totalAmount || 0}</td></tr>
            </table>
            <p class="status">✅ Verified Digital Record</p>
          </div>
        </body>
      </html>
    `);
    doc.close();

    
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 400);
  };

  return (
    <div className={styles.container}>
      {}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => setNavSelection("Dashboard")}
          type="button"
        >
          ← Back to Dashboard
        </button>

        <h1 className={styles.title}>📄 Generate Reports</h1>
      </div>

      {}
      {loading ? (
        <div className={styles.loading}>Loading Transactions...</div>
      ) : transactions.length === 0 ? (
        <div className={styles.noData}>No Transactions Found</div>
      ) : (
        <div className={styles.cardGrid}>
          {sortedTransactions.map((item) => (
            <div className={styles.txCard} key={item.id || item.transactionDate}>
              
              <div className={styles.cardHeader}>
                <span className={styles.cropBadge}>🌾 {item.crop}</span>
                <span className={styles.statusBadge}>{item.status}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.detailRow}>
                  <span>Farmer:</span>
                  <strong>{item.farmerName}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Trader Email:</span>
                  <strong>{item.traderEmail}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Quantity:</span>
                  <span>{item.quantity} kg</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Rate:</span>
                  <span>₹{item.rate}/kg</span>
                </div>

                <hr className={styles.divider} />

                <div className={styles.detailRow}>
                  <span className={styles.totalLabel}>Total Amount:</span>
                  <span className={styles.totalValue}>₹{item.totalAmount}</span>
                </div>
                
                <div className={styles.dateText}>📅 {item.transactionDate}</div>
              </div>

              <div className={styles.cardFooter}>
                <button 
                  onClick={() => downloadSingleTransaction(item)} 
                  className={styles.actionDownloadBtn}
                >
                  📥 Save
                </button>
                <button 
                  onClick={() => printSingleTransaction(item)} 
                  className={styles.actionPrintBtn}
                >
                  🖨️ Print
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;