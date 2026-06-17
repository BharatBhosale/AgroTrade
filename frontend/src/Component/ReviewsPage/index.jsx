import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import styles from "./style.module.css";

const ReviewsPage = ({
  setNavSelection
}) => {

  const [traders, setTraders] =
    useState([]);

  const [farmerName, setFarmerName] =
    useState("");

  const [selectedTrader, setSelectedTrader] =
    useState(null);

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  
  useEffect(() => {

    axios
      .get(
        "http://localhost:8080/api/traders/all"
      )
      .then((response) => {

        setTraders(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  
  const submitReview = async () => {

    if (
      farmerName === "" ||
      selectedTrader === null ||
      review === ""
    ) {

      alert(
        "Fill all fields ❌"
      );

      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/reviews/add",
        {

          farmerName:
            farmerName,

          traderName:
            selectedTrader.fullName,

          traderEmail:
            selectedTrader.email,

          rating:
            rating,

          reviewText:
            review,

        }
      );

      alert(
        "✅ Review Submitted"
      );

      setFarmerName("");

      setSelectedTrader(null);

      setRating(5);

      setReview("");

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Submit Review ❌"
      );

    }
  };

  return (
    <div className={styles.page}>

      <div className={styles.header}>

        <h1 className={styles.title}>
          ⭐ Trader Reviews
        </h1>

        <button
          className={styles.backBtn}
          onClick={() =>
            setNavSelection(
              "Dashboard"
            )
          }
        >
          ← Back Dashboard
        </button>

      </div>

      <div className={styles.card}>

        <h2>
          Give Review To Trader
        </h2>

        {}
        <input
          type="text"
          placeholder="Enter Your Name"
          value={farmerName}
          onChange={(e) =>
            setFarmerName(
              e.target.value
            )
          }
        />

        {}
        <select
          value={
            selectedTrader
              ? JSON.stringify(
                  selectedTrader
                )
              : ""
          }
          onChange={(e) =>
            setSelectedTrader(
              JSON.parse(
                e.target.value
              )
            )
          }
        >

          <option value="">
            Select Trader
          </option>

          {traders.map((trader) => (

            <option
              key={trader.id}
              value={JSON.stringify(trader)}
            >
              {trader.fullName}
            </option>

          ))}

        </select>

        {}
        <select
          value={rating}
          onChange={(e) =>
            setRating(
              e.target.value
            )
          }
        >

          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>

          <option value="4">
            ⭐⭐⭐⭐
          </option>

          <option value="3">
            ⭐⭐⭐
          </option>

          <option value="2">
            ⭐⭐
          </option>

          <option value="1">
            ⭐
          </option>

        </select>

        {}
        <textarea
          placeholder="Write Review"
          value={review}
          onChange={(e) =>
            setReview(
              e.target.value
            )
          }
        />

        {}
        <button
          className={styles.submitBtn}
          onClick={submitReview}
        >
          Submit Review
        </button>

      </div>

    </div>
  );
};

export default ReviewsPage;