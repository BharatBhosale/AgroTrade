import "./App.css";
import { useState, useEffect } from "react";

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
import TraderDashboard from "./Component/TraderDashboard";

import FarmerSearchTrader from "./Component/FarmerSearchTrader";

import PricesPage from "./Component/PricesPage";
import ProfilePage from "./Component/ProfilePage";
import ReviewsPage from "./Component/ReviewsPage";

import FarmerDetailsPage from "./Component/FarmerDetailsPage";
import Transaction from "./Component/Transaction";
import TransactionsPage from "./Component/TransactionsPage";
import ReportsPage from "./Component/ReportsPage";

import SearchPage from "./pages/SearchPage";

function App() {
  const [navSelection, setNavSelection] = useState(
    localStorage.getItem("navSelection") || "Home",
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("navSelection", navSelection);
  }, [navSelection]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);

    alert("Logged Out ✅");

    setNavSelection("Home");
  };

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
        return <Login setNavSelection={setNavSelection} setUser={setUser} />;

      case "Farmer":
        return <FarmerRegister setNavSelection={setNavSelection} />;

      case "Trader":
        return <TraderRegister setNavSelection={setNavSelection} />;

      case "Dashboard":
        return <FarmerDashboard setNavSelection={setNavSelection} />;

      case "FarmerSearchTrader":
        return <FarmerSearchTrader setNavSelection={setNavSelection} />;

      case "TraderDashboard":
        return <TraderDashboard setNavSelection={setNavSelection} />;

      case "Search":
        return <SearchPage setNavSelection={setNavSelection} />;

      case "Prices":
        return <PricesPage setNavSelection={setNavSelection} />;

      case "Transactions":
        return <TransactionsPage setNavSelection={setNavSelection} />;

      case "Reviews":
        return <ReviewsPage setNavSelection={setNavSelection} />;

      case "Reports":
        return <ReportsPage setNavSelection={setNavSelection} />;

      case "Profile":
        return <ProfilePage setNavSelection={setNavSelection} />;

      case "FarmerDetails":
        return (
          <FarmerDetailsPage
            farmer={JSON.parse(localStorage.getItem("selectedFarmer"))}
            setNavSelection={setNavSelection}
          />
        );

      case "Transaction":
        return <Transaction setNavSelection={setNavSelection} />;

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
      {}

      <Navbar
        navSelection={navSelection}
        setNavSelection={setNavSelection}
        setSidebarOpen={setSidebarOpen}
        user={user}
        handleLogout={handleLogout}
      />

      {}

      <Sidebar
        open={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navSelection={navSelection}
        setNavSelection={setNavSelection}
        user={user}
        handleLogout={handleLogout}
      />

      {}

      <main className="main-content">{pages(navSelection)}</main>

      {}

      <Footer />
    </div>
  );
}

export default App;
