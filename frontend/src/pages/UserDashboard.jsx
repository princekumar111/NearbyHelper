// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { isLoggedIn, logout, getUserFromToken } from '../utils/auth';
// import Navbar from '../components/Navbar';
// import API from '../utils/axios';

// const UserDashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const user = getUserFromToken();
//   const navigate = useNavigate(); // 👈 used to redirect

//   // 🔒 Protect this component on mount
//   useEffect(() => {
//     if (!isLoggedIn()) {
//       logout(); // clear token & redirect to /login
//     }
//   }, []);

//   // Fetch service categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await API.get('/categories');
//         setCategories(res.data);
//       } catch (err) {
//         setError('Failed to load categories.');
//         console.error(err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Handle "Book" button click
//   const handleBookClick = (categoryName) => {
//     navigate(`/providers/${categoryName.toLowerCase()}`);
//   };

//   return (
//     <>
//       <Navbar role="user" />
//       <div className="container py-5">
//         <h2>Welcome, {user?.name || 'User'}!</h2>
//         {error && <div className="alert alert-danger">{error}</div>}

//         <h4 className="mt-4">Browse Services</h4>
//         <div className="row mt-3">
//           {categories.length > 0 ? (
//             categories.map((cat) => (
//               <div className="col-md-4 mb-4" key={cat._id}>
//                 <div className="card p-3 shadow-sm text-center h-100 d-flex flex-column justify-content-between">
//                   <div>
//                     <div className="display-4">{cat.icon || '🔧'}</div>
//                     <h5 className="mt-2">{cat.name}</h5>
//                   </div>
//                   <button
//                     className="btn btn-primary mt-3"
//                     onClick={() => handleBookClick(cat.name)}
//                   >
//                     View Worker
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-muted">No categories available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserDashboard;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getUserFromToken } from '../utils/auth';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import './UserDashboard.css'; // 👈 Custom styles

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      logout();
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (err) {
        setError('Failed to load categories.');
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleBookClick = (categoryName) => {
    navigate(`/providers/${categoryName.toLowerCase()}`);
  };

  return (
    <>
      <Navbar role="user" />
      <div className="dashboard-container py-5">
        <div className="welcome-box">
          <h2>Welcome, <span>{user?.name || 'User'}</span> 👋</h2>
          <p>Find and book trusted home services instantly.</p>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <h4 className="mt-5 mb-4">Browse Services</h4>
        <div className="row">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div className="col-md-4 mb-4" key={cat._id}>
                <div className="service-card card h-100 shadow-sm text-center">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-icon">{cat.icon || '🔧'}</div>
                      <h5 className="mt-3">{cat.name}</h5>
                    </div>
                    <button
                      className="btn btn-primary mt-4"
                      onClick={() => handleBookClick(cat.name)}
                    >
                      View Worker
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No categories available.</p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-dark text-light py-5 mt-5">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-3">
              <h5>NearbyHelper Company</h5>
              <ul className="list-unstyled">
                <li>About us</li>
                <li>Investor Relations</li>
                <li>Terms & Conditions</li>
                <li>Privacy policy</li>
                <li>Anti-discrimination policy</li>
                <li>ESG Impact</li>
                <li>Careers</li>
              </ul>
            </div>

            {/* For Customers */}
            <div className="col-md-3">
              <h5>For customers</h5>
              <ul className="list-unstyled">
                <li>NBH reviews</li>
                <li>Categories near you</li>
                <li>Contact us</li>
              </ul>
            </div>

            {/* For Professionals */}
            <div className="col-md-3">
              <h5>For professionals</h5>
              <ul className="list-unstyled">
                <li>Register as a professional</li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="col-md-3">
              <h5>Follow us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-light"><FaFacebookF /></a>
                <a href="#" className="text-light"><FaInstagram /></a>
                <a href="#" className="text-light"><FaTwitter /></a>
                <a href="#" className="text-light"><FaLinkedinIn /></a>
                <a href="#" className="text-light"><FaYoutube /></a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center mb-0">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default UserDashboard;
