import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ThreeDotMenu from "../components/ThreeDotMenu";   // ✅ Correct import

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  // ✅ Define links
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

  // ✅ Define logout
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

  return (
    <nav className="navbar navbar-expand-lg mb-4 nh-navbar" style={{ backgroundColor: 'hsl(0, 0%, 90%)' }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center nh-brand" to="/">
          <img src="/service_images/logo.webp" alt="NearbyHelper Logo" className="logo" />
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === 'admin' && adminLinks}
            {role === 'user' && userLinks}
            {role === 'provider' && providerLinks}
          </ul>

          {/* Search */}
          <form className="d-flex me-3">
            <input className="form-control me-2" type="search" placeholder="Search services..." aria-label="Search" />
          </form>

          {/* Role + Logout + 3-dot menu */}
          <div className="d-flex align-items-center">
            {role && (
              <span className="text-dark me-3 text-capitalize">
                Role: <strong>{role}</strong>
              </span>
            )}
            <button className="btn btn-outline-dark me-3" onClick={handleLogout}>
              Logout
            </button>

            {/* ✅ Add ThreeDotMenu here */}
            <ThreeDotMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
