import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import styles from "./style.module.css";

const ProfilePage = ({
  setNavSelection
}) => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [isEditing, setIsEditing] =
    useState(false);

  const [profileData, setProfileData] =
    useState({

      fullName: "",

      email: "",

      phone: "",

      city: "",

      state: "",

      address: "",

      accountType: "Farmer",

    });

  // FETCH PROFILE
  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/api/farmers/${user.id}`
        );

      console.log(response.data);

      setProfileData({

        fullName:
          response.data.fullName,

        email:
          response.data.email,

        phone:
          response.data.phone,

        city:
          response.data.city,

        state:
          response.data.state,

        address:
          response.data.address,

        accountType:
          "Farmer",

      });

    } catch (error) {

      console.log(
        "Profile Error:",
        error
      );

    }
  };

  // SAVE PROFILE
  const handleSave = async () => {

    try {

      await axios.put(
        `http://localhost:8080/api/farmers/${user.id}`,
        profileData
      );

      alert(
        "✅ Profile Updated Successfully"
      );

      setIsEditing(false);

      fetchProfile();

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Update Profile ❌"
      );

    }
  };

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>

        <h2 className={styles.title}>
          👤 My Profile
        </h2>

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

      {/* PROFILE CARD */}
      <div className={styles.profileCard}>

        {/* TOP */}
        <div className={styles.profileHeader}>

          <div className={styles.avatar}>
            👨‍🌾
          </div>

          <div className={styles.profileInfo}>

            <h2>
              {profileData.fullName}
            </h2>

            <p>
              {profileData.accountType}
              {" "}
              Account
            </p>

          </div>

        </div>

        {/* FORM */}
        <div className={styles.profileFields}>

          {/* FULL NAME */}
          <div>

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={
                profileData.fullName
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  fullName:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* EMAIL */}
          <div>

            <label>Email</label>

            <input
              type="email"
              value={
                profileData.email
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  email:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* PHONE */}
          <div>

            <label>Phone</label>

            <input
              type="text"
              value={
                profileData.phone
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  phone:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* CITY */}
          <div>

            <label>City</label>

            <input
              type="text"
              value={
                profileData.city
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  city:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* STATE */}
          <div>

            <label>State</label>

            <input
              type="text"
              value={
                profileData.state
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  state:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* ADDRESS */}
          <div>

            <label>Address</label>

            <input
              type="text"
              value={
                profileData.address
              }
              onChange={(e) =>
                setProfileData({

                  ...profileData,

                  address:
                    e.target.value,

                })
              }
              readOnly={!isEditing}
            />

          </div>

          {/* ACCOUNT */}
          <div>

            <label>
              Account Type
            </label>

            <input
              type="text"
              value={
                profileData.accountType
              }
              readOnly
            />

          </div>

        </div>

        {/* BUTTONS */}
        <div className={styles.profileActions}>

          {!isEditing ? (

            <>

              <button
                className={styles.blue}
                onClick={() =>
                  setIsEditing(true)
                }
              >
                ✏️ Edit Profile
              </button>

              <button
                className={styles.green}
              >
                🔐 Change Password
              </button>

            </>

          ) : (

            <>

              <button
                className={styles.green}
                onClick={handleSave}
              >
                ✓ Save Changes
              </button>

              <button
                className={styles.blue}
                onClick={() =>
                  setIsEditing(false)
                }
              >
                ✕ Cancel
              </button>

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;