import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MarketplacePage() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locationStr, setLocationStr] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const imgStudio = "url('/images/property_studio_1775148298045.png')";
  const imgRoom = "url('/images/property_room_1775148324058.png')";
  const imgCondo = "url('/images/property_condo_1775148576768.png')";

  const initialData = [
    { id: 1, title: "Modern Studio near IT Park", rating: "⭐ 4.8 (24)", location: "IT Park", fullLocation: "📍 IT Park, Cebu City", beds: 1, baths: 1, size: 28, priceStr: "₱12,000/month", priceNum: 12000, landlord: "by Maria Santos", image: imgStudio, type: "Studio" },
    { id: 2, title: "Cozy Room in Banilad", rating: "⭐ 4.5 (18)", location: "Banilad", fullLocation: "📍 Banilad, Cebu City", beds: 1, baths: 1, size: 16, priceStr: "₱5,500/month", priceNum: 5500, landlord: "by Juan Dela Cruz", image: imgRoom, type: "Room" },
    { id: 3, title: "1br Condo in Mabolo", rating: "⭐ 4.9 (31)", location: "Mabolo", fullLocation: "📍 Mabolo, Cebu City", beds: 1, baths: 1, size: 36, priceStr: "₱15,000/month", priceNum: 15000, landlord: "by Ana Reyes", image: imgCondo, type: "Condo" },
    { id: 4, title: "Spacious 2BR in Lahug", rating: "⭐ 4.6 (12)", location: "Lahug", fullLocation: "📍 Lahug, Cebu City", beds: 2, baths: 1, size: 55, priceStr: "₱18,000/month", priceNum: 18000, landlord: "by Pedro Gothid", image: imgCondo, type: "Condo" },
    { id: 5, title: "Budget Room near USC", rating: "⭐ 4.2 (45)", location: "Capitol Site", fullLocation: "📍 Capitol Site, Cebu City", beds: 1, baths: 1, size: 12, priceStr: "₱3,500/month", priceNum: 3500, landlord: "by Rose Tan", image: imgRoom, type: "Room" },
    { id: 6, title: "New Condo Unit in Talamban", rating: "⭐ 4.7 (9)", location: "Talamban", fullLocation: "📍 Talamban, Cebu City", beds: 1, baths: 1, size: 35, priceStr: "₱14,000/month", priceNum: 14000, landlord: "by James Lim", image: imgCondo, type: "Condo" },
    { id: 7, title: "Modern Studio near CITU", rating: "⭐ 4.8 (24)", location: "Tres de Abril", fullLocation: "📍 Tres de Abril, Cebu City", beds: 1, baths: 1, size: 28, priceStr: "₱11,000/month", priceNum: 11000, landlord: "by Maria Santos", image: imgStudio, type: "Studio" },
    { id: 8, title: "1BR Studio Type Condo", rating: "⭐ 4.6 (34)", location: "Labangon", fullLocation: "📍 Labangon, Cebu City", beds: 1, baths: 1, size: 25, priceStr: "₱13,500/month", priceNum: 13500, landlord: "by Luis Cruz", image: imgCondo, type: "Condo" },
  ];

  const [filteredProperties, setFilteredProperties] = useState(initialData);

  const handleSearch = () => {
    const filtered = initialData.filter(p => {
      const matchText = p.title.toLowerCase().includes(searchText.toLowerCase()) || p.type.toLowerCase().includes(searchText.toLowerCase());
      const matchLocation = locationStr ? p.location === locationStr : true;
      const matchPrice = maxPrice ? p.priceNum <= parseInt(maxPrice.replace(/,/g, '')) : true;
      return matchText && matchLocation && matchPrice;
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="landing-page browse-page marketplace-page">
      {/* Navbar segment */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-container" onClick={() => navigate("/")} style={{cursor: "pointer"}}>
            <svg
              className="logo-icon"
              width="40"
              height="40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
               <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(0 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
               <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(60 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
               <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(120 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
               <path d="M50 35 L55 45 L65 50 L55 55 L50 65 L45 55 L35 50 L45 45 Z" fill="#ff3b3f"/>
            </svg>
            <span className="logo-text">Rentmate</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); navigate("/"); }}>HOME</a>
            <a href="/browse" className="nav-link active" onClick={(e) => { e.preventDefault(); navigate("/browse"); }}>BROWSE</a>
          </div>
        </div>
        <div className="navbar-right" style={{ position: 'relative' }}>
          <div className="user-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          
          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="icon">🚪</span> Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header Segment for Browse Page */}
      <div className="browse-header-container">
        <div className="browse-header">
          <h1 className="browse-title">BROWSE RENTALS</h1>
          <p className="browse-subtitle"><u>8 properties available in Cebu City</u></p>
        </div>

        <div className="search-bar browse-search-bar">
          <div className="search-field flex-2">
            <label>
              <span className="icon">🔍</span> Search
            </label>
            <input type="text" placeholder="Search by name, type..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>
          
          <div className="search-field">
            <label>
              <span className="icon">📍</span> Location
            </label>
            <select value={locationStr} onChange={(e) => setLocationStr(e.target.value)}>
              <option value="">All Locations</option>
              <option value="IT Park">IT Park</option>
              <option value="Banilad">Banilad</option>
              <option value="Mabolo">Mabolo</option>
              <option value="Lahug">Lahug</option>
              <option value="Capitol Site">Capitol Site</option>
              <option value="Talamban">Talamban</option>
              <option value="Tres de Abril">Tres de Abril</option>
              <option value="Labangon">Labangon</option>
            </select>
          </div>

          <div className="search-field">
            <label>Max Price</label>
            <input type="text" placeholder="₱ Max (e.g. 15000)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>

          <div className="search-action browse-search-action">
            <button className="btn-solid btn-search-red" onClick={handleSearch}>
               <span className="icon">🔍</span> Search
            </button>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <section className="listings-section browse-listings">
        <div className="listings-grid">
          {filteredProperties.length > 0 ? filteredProperties.map(p => (
            <div key={p.id} className="listing-card" onClick={() => navigate("/listing/1")} style={{ cursor: "pointer" }}>
              <div className="listing-image" style={{ backgroundImage: p.image }}>
                <div className="listing-badge">VERIFIED</div>
                <div className="listing-badge rating-badge">{p.rating}</div>
              </div>
              <div className="listing-content">
                <div className="listing-row">
                  <h3>{p.title}</h3>
                </div>
                <p className="location">{p.fullLocation}</p>
                <div className="amenities">
                   <span>🛏️ {p.beds} Bed</span>
                   <span>🛁 {p.baths} Bath</span>
                   <span>📐 {p.size}m²</span>
                </div>
                <div className="listing-footer">
                  <span className="price">{p.priceStr}</span>
                  <span className="landlord">{p.landlord}</span>
                </div>
              </div>
            </div>
          )) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666'}}>
              <h2>No rentals found matching your criteria.</h2>
              <p>Try adjusting your search layout or max price.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="logo-container">
          <svg
            className="logo-icon"
            width="24"
            height="24"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
             <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(0 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
             <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(60 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
             <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(120 50 50)" stroke="#ff3b3f" strokeWidth="4"/>
             <path d="M50 35 L55 45 L65 50 L55 55 L50 65 L45 55 L35 50 L45 45 Z" fill="#ff3b3f"/>
          </svg>
          <span className="logo-text slim">Rentmate</span>
        </div>
        <div className="copy-text">
          © 2026 RentMate — Simplifying rentals in Cebu City
        </div>
      </footer>
    </div>
  );
}

export default MarketplacePage;
