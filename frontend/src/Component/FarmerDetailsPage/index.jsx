import React, {
  useState
} from "react";

import styles from "./style.module.css";

const FarmerDetailsPage = ({
  farmer,
  setNavSelection
}) => {

  const [isEditing, setIsEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({

      farmerName:
        farmer.farmerName,

      email:
        farmer.email,

      phone:
        farmer.phone,

      location:
        farmer.location,

      crop:
        farmer.crop,

      weight:
        farmer.weight || "",

      quantity:
        farmer.quantity || "",

      price:
        farmer.price || "",

      requirement:
        farmer.requirement || "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSave = () => {

    alert(
      "Farmer Details Saved ✅"
    );

    setIsEditing(false);

  };

  return (
    <div className={styles.page}>

      <div className={styles.header}>

        <h1>
          👨‍🌾 Farmer Details
        </h1>

        <button
          onClick={() =>
            setNavSelection(
              "TraderDashboard"
            )
          }
        >
          ← Back
        </button>

      </div>

      <div className={styles.card}>

        <div className={styles.grid}>

          <div>
            <label>
              Farmer Name
            </label>

            <input
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Email</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Location</label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Crop</label>

            <input
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Weight</label>

            <input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Quantity</label>

            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Price</label>

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

        </div>

        <div className={styles.full}>

          <label>
            Requirement
          </label>

          <textarea
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            disabled={!isEditing}
          />

        </div>

        <div className={styles.actions}>

          {!isEditing ? (

            <button
              onClick={() =>
                setIsEditing(true)
              }
            >
              ✏ Edit
            </button>

          ) : (

            <button
              onClick={handleSave}
            >
              💾 Save
            </button>

          )}

          <button>
            📥 Download
          </button>

        </div>

      </div>

    </div>
  );
};

export default FarmerDetailsPage;