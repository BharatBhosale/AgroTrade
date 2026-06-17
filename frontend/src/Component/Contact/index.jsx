import "./style.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h1>Contact Us</h1>
      <p className="contactSubtitle">Meet the AgroTrade development team</p>

      <div className="teamGrid">
        <div className="teamCard">
          <div className="avatar">BB</div>
          <h3>Bharat Bhosale</h3>
          <p className="role">Project Developer</p>
          <p className="email">Email: bharat@gmail.com</p>
        </div>

        <div className="teamCard">
          <div className="avatar">SK</div>
          <h3>Samarth Kapse</h3>
          <p className="role">Project Developer</p>
          <p className="email">Email: samarth@gmail.com</p>
        </div>

        <div className="teamCard">
          <div className="avatar">KA</div>
          <h3>Kiran Adatarao</h3>
          <p className="role">Project Developer</p>
          <p className="email">Email: kiran@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
