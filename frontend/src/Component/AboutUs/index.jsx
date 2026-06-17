import "./style.css";

const AboutUs = () => {
  return (
    <div className="aboutContainer">
      <h1>About AgroTrade</h1>

      <p className="aboutDescription">
        AgroTrade is a digital agricultural trading platform that connects
        farmers directly with verified traders. It helps farmers find trusted
        traders, view ratings, check transaction history, and reduce fraud or
        delayed payments.
      </p>

      <div className="aboutSection">
        <h2>Our Mission</h2>
        <p>
          Our mission is to help farmers get better market access, trusted
          trader connections, and transparent digital trading support.
        </p>
      </div>

      <div className="aboutSection">
        <h2>Features</h2>
        <ul className="featureList">
          <li>Farmer and trader registration</li>
          <li>Verified trader search</li>
          <li>ML-powered trader recommendations</li>
          <li>Transaction tracking</li>
          <li>Rating and review system</li>
          <li>Direct farmer-trader connection</li>
        </ul>
      </div>

      <div className="aboutSection">
        <h2>Why AgroTrade</h2>
        <p>
          AgroTrade reduces middlemen, improves transparency, and supports
          farmers with digital tools for safe and reliable agricultural trade.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
