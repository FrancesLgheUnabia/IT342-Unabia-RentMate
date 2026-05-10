import React from "react";
import { useNavigate } from "react-router-dom";

function BrowsePage() {
  const navigate = useNavigate();

  const imgStudio = "url('/images/property_studio_1775148298045.png')";
  const imgRoom = "url('/images/property_room_1775148324058.png')";
  const imgCondo = "url('/images/property_condo_1775148576768.png')";

  return (
    <div className="landing-page browse-page">
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
        <div className="navbar-right">
          <button className="btn-outline">List your Property</button>
          <button className="btn-solid" onClick={() => navigate("/auth")}>SIGN UP</button>
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
            <input type="text" placeholder="Search by name, type..." />
          </div>
          
          <div className="search-field">
            <label>
              <span className="icon">📍</span> Location
            </label>
            <select>
              <option value="">All Locations</option>
              <option value="IT Park">IT Park</option>
              <option value="Banilad">Banilad</option>
              <option value="Mabolo">Mabolo</option>
            </select>
          </div>

          <div className="search-field">
            <label>Max Price</label>
            <input type="text" placeholder="₱ Max" />
          </div>

          <div className="search-action browse-search-action">
            <button className="btn-solid btn-search-red">
               <span className="icon">🔍</span> Search
            </button>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <section className="listings-section browse-listings">
        <div className="listings-grid">
          {/* Card 1 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgStudio }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>Modern Studio near IT Park</h3>
                <span className="rating">⭐ 4.8 (24)</span>
              </div>
              <p className="location">📍 IT Park, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 28m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱12,000/month</span>
                <span className="landlord">by Maria Santos</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgRoom }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>Cozy Room in Banilad</h3>
                <span className="rating">⭐ 4.5 (18)</span>
              </div>
              <p className="location">📍 Banilad, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 16m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱5,500/month</span>
                <span className="landlord">by Juan Dela Cruz</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgCondo }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>1br Condo in Mabolo</h3>
                <span className="rating">⭐ 4.9 (31)</span>
              </div>
              <p className="location">📍 Mabolo, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 36m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱15,000/month</span>
                <span className="landlord">by Ana Reyes</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgCondo }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>Spacious 2BR in Lahug</h3>
                <span className="rating">⭐ 4.6 (12)</span>
              </div>
              <p className="location">📍 Lahug, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 2 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 55m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱18,000/month</span>
                <span className="landlord">by Pedro Gothid</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgRoom }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>Budget Room near USC</h3>
                <span className="rating">⭐ 4.2 (45)</span>
              </div>
              <p className="location">📍 Capitol Site, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 12m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱3,500/month</span>
                <span className="landlord">by Rose Tan</span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgCondo }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>New Condo Unit in Talamban</h3>
                <span className="rating">⭐ 4.7 (9)</span>
              </div>
              <p className="location">📍 Talamban, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 35m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱14,000/month</span>
                <span className="landlord">by James Lim</span>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgStudio }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>Modern Studio near CITU</h3>
                <span className="rating">⭐ 4.8 (24)</span>
              </div>
              <p className="location">📍 Tres de Abril, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 28m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱11,000/month</span>
                <span className="landlord">by Maria Santos</span>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: imgCondo }}></div>
            <div className="listing-content">
              <div className="listing-row">
                <h3>1BR Studio Type Condo</h3>
                <span className="rating">⭐ 4.6 (34)</span>
              </div>
              <p className="location">📍 Labangon, Cebu City</p>
              <div className="amenities">
                 <span>🛏️ 1 Bed</span>
                 <span>🛁 1 Bath</span>
                 <span>📐 25m²</span>
              </div>
              <div className="listing-footer">
                <span className="price">₱13,500/month</span>
                <span className="landlord">by Luis Cruz</span>
              </div>
            </div>
          </div>

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

export default BrowsePage;
