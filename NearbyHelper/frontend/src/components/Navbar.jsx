import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

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

  const adminLinks = (
    <>
      <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
      <Link className="nav-link" to="/admin/users">Users</Link>
      <Link className="nav-link" to="/admin/providers">Providers</Link>
      <Link className="nav-link" to="/admin/bookings">Bookings</Link>
    </>
  );

  const userLinks = (
    <>
      <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
      <Link className='nav-link' to="/user/bookings">My booking</Link>
    </>
  );

  const providerLinks = (
    <>
      <Link className="nav-link" to="/provider/dashboard">Dashboard</Link>
      <Link className="nav-link" to="/provider/dashboard/booking-history">Booking History</Link>
      <Link className='nav-link' to="/provider/profile">profile</Link>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">NearbyHelper</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === 'admin' && adminLinks}
            {role === 'user' && userLinks}
            {role === 'provider' && providerLinks}
          </ul>
          <div className="d-flex align-items-center">
            {role && (
              <span className="text-light me-3 text-capitalize">
                Role: <strong>{role}</strong>
              </span>
            )}
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
