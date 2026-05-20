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
import Login from "./Component/Login";
import FarmerDashboard from "./Component/FarmerDashboard";

// ✅ IMPORTANT → .jsx add केले
import SearchPage from "./pages/SearchPage";
import PricesPage from "./pages/PricesPage";
import TransactionsPage from "./pages/TransactionsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";

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

      case "Login":
        return <Login setNavSelection={setNavSelection} />;

      case "Farmer":
        return <FarmerRegister setNavSelection={setNavSelection} />;

      case "Trader":
        return <TraderRegister setNavSelection={setNavSelection} />;

      case "Dashboard":
        return <FarmerDashboard setNavSelection={setNavSelection} />;
      
      case "TraderDashboard":
        return <h1>Trader Dashboard</h1>;

      // 🔥 NEW PAGES (IMPORTANT)
      case "Search":
        return <SearchPage />;

      case "Prices":
        return <PricesPage />;

      case "Transactions":
        return <TransactionsPage />;

      case "Reviews":
        return <ReviewsPage />;

      case "Reports":
        return <ReportsPage />;

      case "Profile":
        return <ProfilePage />;

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

      {/* Navbar hide only on Dashboard */}
      {navSelection !== "Dashboard" && (
        <Navbar
          navSelection={navSelection}
          setNavSelection={setNavSelection}
          setSidebarOpen={setSidebarOpen}
        />
      )}

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