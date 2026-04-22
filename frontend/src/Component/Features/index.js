import React from "react";
import "./style.css";
import { FaMapMarkerAlt, FaShieldAlt, FaStar, FaChartLine, FaFileAlt, FaLeaf } from "react-icons/fa";

const features = [
  {
    icon: <FaMapMarkerAlt color="green" />,
    title: "Location-Based Search",
    desc: "Find nearby traders based on your location and crop type",
  },
  {
    icon: <FaShieldAlt color="blue" />,
    title: "Verified Traders",
    desc: "Access verified trader information including license and address",
  },
  {
    icon: <FaStar color="orange" />,
    title: "Ratings & Reviews",
    desc: "Rate and review traders after transactions to help others",
  },
  {
    icon: <FaChartLine color="purple" />,
    title: "Real-Time Prices",
    desc: "Get live market prices for crops, fruits, and goods",
  },
  {
    icon: <FaFileAlt color="red" />,
    title: "Transaction Management",
    desc: "Digital transaction slips and monthly/yearly reports",
  },
  {
    icon: <FaLeaf color="green" />,
    title: "ML Recommendations",
    desc: "Get best trader recommendations powered by ML",
  },
];

const Features = () => {
  return (
    <section className="features">
      <h2>Platform Features</h2>

      <div className="grid">
        {features.map((item, i) => (
          <div className="card" key={i}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;