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
import TraderDashboard from "./Component/TraderDashboard";

import FarmerSearchTrader from "./Component/FarmerSearchTrader";

import PricesPage from "./Component/PricesPage";
import ProfilePage from "./Component/ProfilePage";
import ReviewsPage from "./Component/ReviewsPage";

import FarmerDetailsPage from "./Component/FarmerDetailsPage";

import SearchPage from "./pages/SearchPage";
import TransactionsPage from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";

function App() {

  const [navSelection, setNavSelection] =
    useState("Home");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      )
    );

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    alert("Logged Out ✅");

    setNavSelection("Home");

  };

  // PAGE ROUTER
  const pages = (nav) => {

    switch (nav) {

      // HOME
      case "Home":

        return (
          <>

            <Hero
              setNavSelection={
                setNavSelection
              }
            />

            <Features />

            <HowItWorks />

          </>
        );

      // ABOUT
      case "About":

        return <AboutUs />;

      // CONTACT
      case "Contact":

        return <Contact />;

      // LOGIN
      case "Login":

        return (

          <Login

            setNavSelection={
              setNavSelection
            }

            setUser={
              setUser
            }

          />

        );

      // FARMER REGISTER
      case "Farmer":

        return (

          <FarmerRegister
            setNavSelection={
              setNavSelection
            }
          />

        );

      // TRADER REGISTER
      case "Trader":

        return (

          <TraderRegister
            setNavSelection={
              setNavSelection
            }
          />

        );

      // FARMER DASHBOARD
      case "Dashboard":

        return (

          <FarmerDashboard
            setNavSelection={
              setNavSelection
            }
          />

        );

      // FARMER SEARCH
      case "FarmerSearchTrader":

        return (

          <FarmerSearchTrader
            setNavSelection={
              setNavSelection
            }
          />

        );

      // TRADER DASHBOARD
      case "TraderDashboard":

        return (

          <TraderDashboard
            setNavSelection={
              setNavSelection
            }
          />

        );

      // SEARCH PAGE
      case "Search":

        return (

          <SearchPage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // PRICES PAGE
      case "Prices":

        return (

          <PricesPage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // TRANSACTIONS PAGE
      case "Transactions":

        return (

          <TransactionsPage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // REVIEWS PAGE
      case "Reviews":

        return (

          <ReviewsPage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // REPORTS PAGE
      case "Reports":

        return (

          <ReportsPage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // PROFILE PAGE
      case "Profile":

        return (

          <ProfilePage
            setNavSelection={
              setNavSelection
            }
          />

        );

      // FARMER DETAILS PAGE
      case "FarmerDetails":

        return (

          <FarmerDetailsPage

            farmer={
              JSON.parse(
                localStorage.getItem(
                  "selectedFarmer"
                )
              )
            }

            setNavSelection={
              setNavSelection
            }

          />

        );

      // DEFAULT
      default:

        return (
          <>

            <Hero
              setNavSelection={
                setNavSelection
              }
            />

            <Features />

            <HowItWorks />

          </>
        );
    }
  };

  return (
    <div className="App">

      {/* NAVBAR */}

      <Navbar

        navSelection={
          navSelection
        }

        setNavSelection={
          setNavSelection
        }

        setSidebarOpen={
          setSidebarOpen
        }

        user={user}

        handleLogout={
          handleLogout
        }

      />

      {/* SIDEBAR */}

      <Sidebar

        open={
          sidebarOpen
        }

        setSidebarOpen={
          setSidebarOpen
        }

        navSelection={
          navSelection
        }

        setNavSelection={
          setNavSelection
        }

      />

      {/* MAIN CONTENT */}

      <main className="main-content">

        {pages(navSelection)}

      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default App;