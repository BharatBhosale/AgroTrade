import styles from "./page.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.page}>

      <h2 className={styles.title}>← My Profile</h2>

      <div className={styles.profileCard}>
        <h2>John Farmer</h2>
        <p>Farmer Account</p>

        <input value="John Farmer" readOnly />
        <input value="john@email.com" readOnly />
        <input value="+91-9876543210" readOnly />

        <button className={styles.green}>Edit Profile</button>
      </div>

    </div>
  );
};

export default ProfilePage;