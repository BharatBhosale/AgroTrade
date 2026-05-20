import "./App.css";
import { useState } from "react";

import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import AboutUs from "./Component/AboutUs";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
import Hero from "./Component/Hero";
import Features from "./Component/Features";
import HowItWorks from "./Component/HowItWorks";
import FarmerRegister from "./Component/FarmerRegister";
import TraderRegister from "./Component/TraderRegister";

function App() {

  const [navSelection, setNavSelection] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = (nav) => {
    switch (nav) {

      case "Home":
        return (
          <>
            <Hero setNavSelection={setNavSelection} /> 
            <Features />
            <HowItWorks />
          </>
        );

      case "About":
        return <AboutUs />;

      case "Contact":
        return <Contact />;
      case "Farmer":
        return <FarmerRegister setNavSelection={setNavSelection} />;

      case "Trader":
        return <TraderRegister setNavSelection={setNavSelection} />;

      default:
        return (
          <>
            <Hero setNavSelection={setNavSelection} />
            <Features />
            <HowItWorks />
          </>
        );
    }
  };

  return (
    <div className="App">

      <Navbar
        navSelection={navSelection}
        setNavSelection={setNavSelection}
        setSidebarOpen={setSidebarOpen}
      />

      <Sidebar
        open={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navSelection={navSelection}
        setNavSelection={setNavSelection}
      />

      <main className="main-content">
        {pages(navSelection)}
      </main>

      <Footer />

    </div>
  );
}

export default App;