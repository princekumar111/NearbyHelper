

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import API from '../utils/axios';
// import Navbar from '../components/Navbar';

// const ProviderDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [updatingId, setUpdatingId] = useState(null);

//   const token = localStorage.getItem('token');

//   const config = useMemo(() => ({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   }), [token]);

//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await API.get('/providers/dashboard/upcoming', config);
//       console.log(res.data.upcomingBookings);
//       setBookings(res.data.upcomingBookings);

//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch bookings.');
//     } finally {
//       setLoading(false);
//     }
//   }, [config]);

//   const updateStatus = async (bookingId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this as '${status}'?`)) return;

//     try {
//       setUpdatingId(bookingId);
//       await API.put(`/bookings/${bookingId}/status`, { status }, config);
//       fetchBookings(); // Refresh after update
//     } catch (err) {
//       console.error('Status update failed:', err);
//       alert('Failed to update status');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'pending': return 'badge bg-secondary';
//       case 'confirmed': return 'badge bg-info text-dark';
//       case 'completed': return 'badge bg-success';
//       case 'cancelled': return 'badge bg-danger';
//       default: return 'badge bg-dark';
//     }
//   };

//   return (
//     <>
//       <Navbar role="provider" />
//       <div className="container py-4">
//         <h2 className="mb-4">📅 Upcoming Bookings</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <div className="alert alert-danger">{error}</div>
//         ) : bookings.length === 0 ? (
//           <p>No upcoming bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div className="card mb-3 shadow-sm p-3" key={booking._id}>
//               <h5>👤 {booking.userId?.name}</h5>
//               <p>📧 {booking.userId?.email}</p>
//               <p>🗓 {new Date(booking.date).toLocaleString()}</p>
//               <p>📝 {booking.description || 'No description provided'}</p>
//               <p>
//                 📌 Status:{' '}
//                 <span className={getStatusBadge(booking.status)}>
//                   {booking.status.toUpperCase()}
//                 </span>
//               </p>

//               {['pending', 'confirmed'].includes(booking.status) && (
//                 <div className="mt-2 d-flex gap-2 flex-wrap">
//                   {booking.status === 'pending' && (
//                     <button
//                       className="btn btn-primary btn-sm"
//                       onClick={() => updateStatus(booking._id, 'confirmed')}
//                       disabled={updatingId === booking._id}
//                     >
//                       ✅ Confirm
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => updateStatus(booking._id, 'completed')}
//                     disabled={updatingId === booking._id}
//                   >
//                     ✔ Mark as Completed
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => updateStatus(booking._id, 'cancelled')}
//                     disabled={updatingId === booking._id}
//                   >
//                     ✖ Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default ProviderDashboard;











// src/pages/UserDashboard.jsx (example path)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getUserFromToken } from '../utils/auth';
import NavbarProviderDashboard from '../components/NavbarProviderDashboard';
import API from '../utils/axios';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import './ProviderDashboard.css';


// ✅ Import your slider (update the path if needed)
import MultiItemCarousel from "./MultiItemCarousel";




// ✅ Define items ONCE (no JSX outside components)
const sliderItems = [
  { image: "/service_images/plumber_slide.jpg",     title: "Plumber" },
  { image: "/service_images/electrician_slide.jpg", title: "Electrician" },
  { image: "/service_images/carpenter_slide.jpg",   title: "Carpenter" },
  { image: "/service_images/painter_slide.jpg",     title: "Painter" },
  { image: "/service_images/mechanic_slide.WEBP",     title: "Mechanic" },
  { image: "/service_images/cleaning_slide.jpg",     title: "Cleaner" },
  
];


const ProviderDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) logout();
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
    navigate(`/providers/${String(categoryName).toLowerCase()}`);
  };

  return (
    <>
      <NavbarProviderDashboard role="user" />
      <div className="dashboard-container py-5">
        <div className="welcome-box">
          <h2>Welcome, {user?.name || 'User'}</h2>
          <h2>Find and book trusted home services instantly.</h2>
        </div>

        
{/* ✅ Banner Section */}
<div className="gif-banner">
  <img src="/service_images/Background_image.jpg" alt="Service Banner" className="gif-image" />
  <div className="gif-text">
    <h2>Reliable Services at Your Doorstep</h2>
    <p>Book trusted professionals anytime, anywhere!</p>
    <p>Hire smart, safe, and fast—verified workers for your every need.</p>
  </div>
</div>




        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <h4 className="mt-5 mb-4">Explore Service Categories</h4>
        <div className="row">
          {categories.length > 0 ? (
            categories.map((cat) => {
              const catName = String(cat?.name || '').toLowerCase();
              return (
                <div className="col-md-4 mb-4" key={cat._id}>
                  <div className="service-card card h-100 shadow-sm text-center">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src={`/service_images/${catName}_image.jpg`}
                          alt={cat?.name || 'Service'}
                          className="img-fluid rounded"
                          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                          onError={(e) => { e.currentTarget.src = "/service_images/placeholder.jpg"; }}
                        />
                      </div>
                      <button
                        className="btn btn-primary mt-4 w-100"
                        onClick={() => handleBookClick(cat?.name || '')}
                      >
                        {cat?.name || 'Service'}s
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted">No categories available.</p>
          )}
        </div>
      </div>

      <div style={{ marginLeft: "136px" }}>
        <h4 className="mt-4 text-black">
             Most Booked Services
        </h4>
      </div>



      {/* ✅ Slider (no undefined <ImageSlider/>) */}
      <div className="my-5">
        <MultiItemCarousel items={sliderItems} />
      </div>

      {/* Footer Section */}
      <footer className="custom-footer">
        <div className="container">
          <div className="row">
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
            <div className="col-md-3">
              <h5>For customers</h5>
              <ul className="list-unstyled">
                <li>NBH reviews</li>
                <li>Categories near you</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>For professionals</h5>
              <ul className="list-unstyled">
                <li>Register as a professional</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Follow us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-dark"><FaFacebookF /></a>
                <a href="#" className="text-dark"><FaInstagram /></a>
                <a href="#" className="text-dark"><FaTwitter /></a>
                <a href="#" className="text-dark"><FaLinkedinIn /></a>
                <a href="#" className="text-dark"><FaYoutube /></a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-center mb-0">© {new Date().getFullYear()} NearbyHelper. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default ProviderDashboard;



