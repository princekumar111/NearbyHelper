
import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ThreeDotMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleLinkClick = () => setShowMenu(false);

  return (
    <>
      <style>{`
        .three-dot-container { position: relative; display: inline-block; }
        .menu-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1002;
        }
        .menu-btn:hover { transform: scale(1.1); }
        .dot {
          width: 6px; height: 6px;
          background: #333; border-radius: 50%;
          transition: all 0.3s ease;
        }
        .menu-btn:hover .dot { background: #667eea; }
        .menu-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          opacity: 0; visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(3px);
        }
        .menu-overlay.show { opacity: 1; visibility: visible; }
        .menu-panel {
          position: fixed; top: 0; right: -400px;
          width: 100%; max-width: 400px;
          height: 100vh;
          background: white; /* ✅ panel background white */
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          transition: right 0.3s ease;
          overflow-y: auto;
        }
        .menu-panel.show { right: 0; }
        .menu-header {
          padding: 10px;
          background: hsl(0, 0%, 90%); /* ✅ header light gray */
          color: black;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .menu-header h3 { margin: 0; font-size: 1.5rem; }
        .close-btn {
          background: transparent; border: none;
          color: black; font-size: 2rem;
          cursor: pointer; padding: 0;
          width: 40px; height: 40px;
          display: flex; align-items: center;
          justify-content: center; border-radius: 50%;
          transition: all 0.3s ease;
        }
        .close-btn:hover { background: rgba(0,0,0,0.1); transform: rotate(90deg); }
        .menu-content { padding: 20px 0; }
        .menu-item {
          display: flex; align-items: center;
          padding: 16px 30px;
          color: #333; text-decoration: none;
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
          font-size: 1.1rem;
        }
        .menu-item:hover {
          background: #e65c00;
          border-left-color: hsl(0, 0%, 90%);
          padding-left: 40px;
          color: black;
        }
        .menu-item-icon { margin-right: 15px; font-size: 1.3rem; }
        @media (max-width: 768px) { .menu-panel { max-width: 300px; } }
      `}</style>

      <div className="three-dot-container">
        <button className="menu-btn" onClick={toggleMenu} aria-label="Menu">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </button>

        <div className={`menu-overlay ${showMenu ? "show" : ""}`} onClick={toggleMenu} />

        <div className={`menu-panel ${showMenu ? "show" : ""}`}>
          <div className="menu-header">
            <h3>Menu</h3>
            <button className="close-btn" onClick={toggleMenu} aria-label="Close menu">×</button>
          </div>

          <div className="menu-content">
            <Link to="/" className="menu-item" onClick={handleLinkClick}><span className="menu-item-icon">🏠</span> Home</Link>
            <Link to="/AboutUs" className="menu-item" onClick={handleLinkClick}><span className="menu-item-icon">ℹ️</span> About Us</Link>
            <Link to="/MyAccount" className="menu-item" onClick={handleLinkClick}><span className="menu-item-icon">👤</span> My Account</Link>
            <Link to="/Contacts" className="menu-item" onClick={handleLinkClick}><span className="menu-item-icon">📞</span> Contact Us</Link>
            <Link to="/bookings" className="menu-item" onClick={handleLinkClick}><span className="menu-item-icon">📝</span> My Bookings</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeDotMenu;

