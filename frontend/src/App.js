import "./App.css";
import { useState } from "react";

import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import AboutUs from "./Component/AboutUs";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";

function App() {

  const [navSelection, setNavSelection] = useState("About");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = (nav) => {
    switch (nav) {
      case "About":
        return <AboutUs />;
      case "Contact":
        return <Contact />;
      default:
        return <AboutUs />;
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

      <Footer/>

    </div>
  );
}

export default App;