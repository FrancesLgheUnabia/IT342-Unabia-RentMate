import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListingDetailsPage() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    checkInDate: "",
    checkOutDate: "",
    message: ""
  });
  const [reservationStatus, setReservationStatus] = useState({ loading: false, success: false, error: "" });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSubmitReservation = async () => {
    setReservationStatus({ loading: true, success: false, error: "" });
    let userObj = { id: 1 }; // Default fallback
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        userObj = JSON.parse(userStr);
      } catch (e) {}
    }

    const payload = {
      propertyId: "1", // Hardcoded for this mockup view
      renterId: userObj.id || 1,
      checkInDate: reservationData.checkInDate,
      checkOutDate: reservationData.checkOutDate,
      message: reservationData.message,
      totalAmount: 12000.0,
      status: "PENDING"
    };

    try {
      const res = await fetch("http://localhost:8081/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReservationStatus({ loading: false, success: true, error: "" });
        setTimeout(() => {
          setShowReservationModal(false);
          setReservationStatus({ loading: false, success: false, error: "" }); // Reset for next time
          setReservationData({ checkInDate: "", checkOutDate: "", message: "" });
        }, 2000);
      } else {
        setReservationStatus({ loading: false, success: false, error: data.message || "Failed to submit request." });
      }
    } catch (err) {
      setReservationStatus({ loading: false, success: false, error: "Server connection failed." });
    }
  };

  const placeholderSvg = `url('/images/property_studio_1775148298045.png')`;

  return (
    <div className="landing-page listing-page">
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
            <a href="/browse" className="nav-link active" onClick={(e) => { e.preventDefault(); navigate("/marketplace"); }}>BROWSE</a>
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

      <div className="listing-details-container">
        <div className="back-link" onClick={() => navigate("/marketplace")}>
          &larr; Back to listings
        </div>

        <div className="listing-layout">
          <div className="listing-left">
            <div className="main-image" style={{ backgroundImage: placeholderSvg, backgroundColor: '#fcfcfc' }}></div>
            
            <div className="tags-row">
              <span className="tag-verified"><span className="icon">✓</span> Verified</span>
              <span className="tag-type">Studio</span>
            </div>

            <h1 className="property-title">Modern Studio near IT Park</h1>
            
            <div className="property-meta">
              <span className="location">📍 IT Park, Cebu City</span>
              <span className="rating">⭐ 4.8 (24 reviews)</span>
            </div>
            
            <div className="property-features">
              <span>🛏️ 1 Bedroom</span>
              <span>🛁 1 Bathroom</span>
              <span>📐 28m²</span>
            </div>

            <div className="property-description">
              <h3>About this Property</h3>
              <p>
                Fully furnished studio unit with city views, perfect for IT professionals. Walking distance to major tech offices. Includes WiFi, AC, and access to gym and pool.
              </p>
            </div>

            <div className="amenities-list">
              <h3>Amenities</h3>
              <div className="amenity-badges">
                <span>WIFI</span>
                <span>AC</span>
                <span>GYM</span>
                <span>POOL</span>
                <span>PARKING</span>
              </div>
            </div>
          </div>

          <div className="listing-right">
            <div className="action-card">
              <h2 className="price-title">₱12,000/month</h2>
              <button className="btn-request" onClick={() => setShowReservationModal(true)}>
                Request Reservation
              </button>
              <p className="action-hint">The landlord will review and approve your request</p>
            </div>

            <div className="contact-card">
              <h3>Contact Landlord</h3>
              <div className="landlord-info">
                <div className="landlord-avatar">
                  <img src="https://ui-avatars.com/api/?name=Maria+Santos&background=f5a623&color=fff&rounded=true" alt="Maria Santos" />
                </div>
                <div className="landlord-details">
                  <h4>Maria Santos</h4>
                  <p>Property Owner</p>
                </div>
                <div className="message-box">
                  <textarea placeholder="Hi, I'm interested in this property..."></textarea>
                  <button className="btn-send">
                    <span>📤</span> Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="logo-container">
          <svg className="logo-icon" width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {showReservationModal && (
        <div className="modal-overlay">
          <div className="modal-content reservation-modal">
            <button className="modal-close" onClick={() => setShowReservationModal(false)}>✕</button>
            <h2>Request Reservation</h2>
            <p className="modal-desc">Submit your reservation request below. The Landlord will review and respond to approve your stay.</p>
            
            <div className="form-row date-row">
              <div className="form-group">
                <label>Check-In Date</label>
                <div className="input-wrapper">
                  <input type="date" placeholder="Check-In Date" value={reservationData.checkInDate} onChange={(e) => setReservationData({...reservationData, checkInDate: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Check-Out Date</label>
                <div className="input-wrapper">
                  <input type="date" placeholder="Check-Out Date" value={reservationData.checkOutDate} onChange={(e) => setReservationData({...reservationData, checkOutDate: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-group message-group">
              <label>Message</label>
              <textarea placeholder="Hi, I'm interested in your property..." value={reservationData.message} onChange={(e) => setReservationData({...reservationData, message: e.target.value})}></textarea>
            </div>

            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Rent</span>
                <span>₱12,000 x 1 month</span>
              </div>
              <div className="breakdown-total">
                <span className="total-label">TOTAL</span>
                <span className="total-val">₱12,000</span>
              </div>
            </div>

            {reservationStatus.error && <div style={{color: 'red', marginTop: '10px', fontSize: '13px', textAlign: 'center'}}>{reservationStatus.error}</div>}
            {reservationStatus.success && <div style={{color: 'green', marginTop: '10px', fontSize: '13px', textAlign: 'center'}}>Reservation request submitted successfully!</div>}

            <div className="modal-actions" style={{marginTop: '20px'}}>
              <button className="btn-cancel" onClick={() => setShowReservationModal(false)}>CANCEL</button>
              <button className="btn-submit" onClick={handleSubmitReservation} disabled={reservationStatus.loading}>
                {reservationStatus.loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetailsPage;
