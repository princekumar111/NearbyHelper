
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import './Navbar.css';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  /* ---------------- ROLE LINKS ---------------- */

  const adminLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/users">Manage Users</Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/bookings">My Booking</Link>
      </li>
    </>
  );

  const providerLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/provider/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/provider/services">My Services</Link>
      </li>
    </>
  );

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    if (role === 'admin') {
      localStorage.removeItem('admin');
      navigate('/admin/login');
    } else if (role === 'provider') {
      localStorage.removeItem('provider');
      navigate('/login');
    } else {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  /* ---------------- AUTO SUGGESTION ---------------- */

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await API.get(`/providers/suggest?q=${search}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error("Suggestion error:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleSelect = (value) => {
    navigate(`/providers/${value}`);
    setSearch("");
    setSuggestions([]);
  };

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <nav
      className="navbar navbar-expand-lg mb-4 nh-navbar"
      style={{ backgroundColor: 'hsl(0, 0%, 90%)' }}
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center nh-brand" to="/">
          <img
            src="/service_images/logo.webp"
            alt="NearbyHelper Logo"
            className="logo"
          />
        </Link>

        <div className="collapse navbar-collapse">

          {/* Role Based Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === 'admin' && adminLinks}
            {role === 'user' && userLinks}
            {role === 'provider' && providerLinks}
          </ul>

          {/* 🔍 Search With Dropdown */}
          <div className="position-relative me-3" ref={dropdownRef} style={{ width: "250px" }}>
            <input
              className="form-control"
              type="search"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100 shadow">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Role + Logout */}
          <div className="d-flex align-items-center">
            {role && (
              <span className="text-dark me-3 text-capitalize">
                Role: <strong>{role}</strong>
              </span>
            )}
            <button
              className="btn btn-outline-dark"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;