import React from "react";
import "./style.css";

const Hero = ({ setNavSelection }) => {
  return (
    <section className="hero">
      <h1>Connecting Farmers & Traders</h1>

      <p>
        A modern platform to bridge the gap between farmers and verified traders.
        Find nearby traders, track transactions, and get ML-powered recommendations.
      </p>

      <div className="hero-buttons">
        <button
          className="btn farmer"
          onClick={() => setNavSelection("Farmer")}
        >
          Register as Farmer
        </button>

        <button
          className="btn trader"
          onClick={() => setNavSelection("Trader")}
        >
          Register as Trader
        </button>
      </div>
    </section>
  );
};

export default Hero;