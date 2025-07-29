import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-4 fw-bold mb-3 text-primary">NearbyHelper</h1>
      <p className="lead mb-4 px-3">
        Find trusted electricians, plumbers, mechanics, and more — right in your neighborhood.
      </p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary px-4">Login</Link>
        <Link to="/register" className="btn btn-outline-primary px-4">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
