import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./features/authentication/pages/AuthPage";
import LandingPage from "./features/home/pages/LandingPage";
import BrowsePage from "./features/listing/pages/BrowsePage";
import MarketplacePage from "./features/listing/pages/MarketplacePage";
import ListingDetailsPage from "./features/listing/pages/ListingDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;