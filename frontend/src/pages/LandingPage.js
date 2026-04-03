import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar segment */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-container">
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
            <a href="/" className="nav-link active">HOME</a>
            <a href="#!" className="nav-link">BROWSE</a>
          </div>
        </div>
        <div className="navbar-right">
          <button className="btn-outline">List your Property</button>
          <button className="btn-solid" onClick={() => navigate("/auth")}>SIGN UP</button>
        </div>
      </nav>

      {/* Hero segment */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Rental in Cebu City</h1>
          <p className="hero-subtitle">
            Browse verified apartments, condos, and boarding houses. Connect directly with
            landlords — no middlemen, no outdated listings.
          </p>

          <div className="search-bar">
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

            <div className="search-action">
              <button className="btn-search">
                 <span className="icon">🔍</span> Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Why RentMate segment */}
      <section className="features-section">
        <h2 className="section-title">Why RentMate?</h2>
        <p className="section-subtitle">A better way to find your next home in Cebu.</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Verified Listings</h3>
            <p>Every property is checked to ensure accurate and up-to-date information.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Booking</h3>
            <p>Request reservations directly through the platform with landlord approval.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Trusted & Moderated Platform</h3>
            <p>Listings are monitored and managed to reduce fake or misleading posts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Ratings & Reviews</h3>
            <p>Read reviews from real renters before making your decision.</p>
          </div>
        </div>
      </section>

      {/* Featured Listings segment */}
      <section className="listings-section">
        <div className="listings-header">
          <div>
            <h2 className="section-title left-align">Featured Listings</h2>
            <p className="section-subtitle left-align">Handpicked properties ready for you.</p>
          </div>
        </div>

        <div className="listings-grid">
          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: "url('/images/property_studio_1775148298045.png')" }}></div>
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

          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: "url('/images/property_room_1775148324058.png')" }}></div>
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

          <div className="listing-card">
            <div className="listing-image" style={{ backgroundImage: "url('/images/property_condo_1775148576768.png')" }}></div>
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

export default LandingPage;
