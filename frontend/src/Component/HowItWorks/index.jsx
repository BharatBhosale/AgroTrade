import React from "react";
import "./style.css";

const steps = [
  { title: "Register", desc: "Create your account as a farmer or trader" },
  { title: "Verify", desc: "Traders submit license for verification" },
  { title: "Connect", desc: "Farmers search and connect with nearby traders" },
  { title: "Trade", desc: "Complete transactions and leave reviews" },
];

const HowItWorks = () => {
  return (
    <section className="how">
      <h2>How It Works</h2>

      <div className="steps">
        {steps.map((step, i) => (
          <div className="step" key={i}>
            <div className="circle">{i + 1}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;