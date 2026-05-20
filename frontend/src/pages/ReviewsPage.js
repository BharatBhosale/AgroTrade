import styles from "./page.module.css";

const ReviewsPage = () => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← Ratings & Reviews</h2>

      <div className={styles.reviewContainer}>

        <div className={styles.reviewBox}>
          <select>
            <option>Select Trader</option>
          </select>

          <textarea placeholder="Write your review..." />

          <button className={styles.green}>Submit Review</button>
        </div>

        <div className={styles.reviewList}>
          <h3>Raj Trading Co.</h3>
          <p>⭐⭐⭐⭐⭐ Excellent service</p>
        </div>

      </div>

    </div>
  );
};

export default ReviewsPage;