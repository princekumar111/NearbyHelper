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






// src/pages/UserDashboard.jsx (example path)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getUserFromToken } from '../utils/auth';
import Navbar from '../components/Navbar';
import API from '../utils/axios';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import './UserDashboard.css';

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


const UserDashboard = () => {
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
      <Navbar role="user" />
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

export default UserDashboard;






























// import React, { useEffect, useState } from 'react';

// const mockCategories = [
//   { _id: 1, name: 'Plumber' },
//   { _id: 2, name: 'Electrician' },
//   { _id: 3, name: 'Carpenter' },
//   { _id: 4, name: 'Painter' },
//   { _id: 5, name: 'Mechanic' },
//   { _id: 6, name: 'Cleaner' }
// ];

// const sliderItems = [
//   { image: "/service_images/plumber_slide.jpg", title: "Plumber" },
//   { image: "/service_images/electrician_slide.jpg", title: "Electrician" },
//   { image: "/service_images/carpenter_slide.jpg", title: "Carpenter" },
//   { image: "/service_images/painter_slide.jpg", title: "Painter" },
//   { image: "/service_images/mechanic_slide.WEBP", title: "Mechanic" },
//   { image: "/service_images/cleaning_slide.jpg", title: "Cleaner" }
// ];

// const mockUser = { name: 'John Doe' };

// const UserDashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState('');
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCategories(mockCategories);
//     }, 500);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleBookClick = (categoryName) => {
//     console.log(`Navigating to: /providers/${String(categoryName).toLowerCase()}`);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
//   };

//   const statsData = [
//     { icon: '👥', number: '10K+', label: 'Happy Customers' },
//     { icon: '⭐', number: '4.8', label: 'Average Rating' },
//     { icon: '🛡️', number: '100%', label: 'Verified' },
//     { icon: '🕒', number: '24/7', label: 'Support' }
//   ];

//   const socialLinks = [
//     { icon: 'f', name: 'Facebook', color: '#1877f2' },
//     { icon: '📷', name: 'Instagram', color: '#e4405f' },
//     { icon: '🐦', name: 'Twitter', color: '#1da1f2' },
//     { icon: 'in', name: 'LinkedIn', color: '#0077b5' },
//     { icon: '▶️', name: 'YouTube', color: '#ff0000' }
//   ];

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
//     }}>
//       {/* Animated Background Shapes */}
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: -1,
//         overflow: 'hidden'
//       }}>
//         <div style={{
//           position: 'absolute',
//           width: '300px',
//           height: '300px',
//           borderRadius: '50%',
//           background: 'rgba(255, 255, 255, 0.1)',
//           top: '10%',
//           left: '10%',
//           animation: 'float 20s infinite ease-in-out'
//         }} />
//         <div style={{
//           position: 'absolute',
//           width: '200px',
//           height: '200px',
//           borderRadius: '50%',
//           background: 'rgba(255, 255, 255, 0.05)',
//           top: '60%',
//           right: '10%',
//           animation: 'float 25s infinite ease-in-out reverse'
//         }} />
//         <div style={{
//           position: 'absolute',
//           width: '150px',
//           height: '150px',
//           borderRadius: '50%',
//           background: 'rgba(255, 255, 255, 0.08)',
//           top: '30%',
//           left: '60%',
//           animation: 'float 30s infinite ease-in-out'
//         }} />
//       </div>

//       {/* Hero Section */}
//       <div style={{
//         padding: '60px 20px',
//         textAlign: 'center',
//         position: 'relative'
//       }}>
//         <div style={{
//           background: 'rgba(255, 255, 255, 0.15)',
//           backdropFilter: 'blur(20px)',
//           WebkitBackdropFilter: 'blur(20px)',
//           border: '1px solid rgba(255, 255, 255, 0.2)',
//           borderRadius: '30px',
//           padding: '40px',
//           maxWidth: '900px',
//           margin: '0 auto',
//           boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
//           transition: 'all 0.3s ease'
//         }}>
//           <h1 style={{
//             color: 'white',
//             fontSize: '3.5rem',
//             fontWeight: '700',
//             marginBottom: '20px',
//             textShadow: '0 4px 8px rgba(0,0,0,0.3)',
//             lineHeight: '1.2'
//           }}>
//             Welcome, {mockUser?.name || 'User'}! ✨
//           </h1>
//           <p style={{
//             color: 'rgba(255,255,255,0.9)',
//             fontSize: '1.3rem',
//             marginBottom: '30px',
//             lineHeight: '1.6'
//           }}>
//             Find and book trusted home services instantly.
//             <br />
//             <span style={{ fontWeight: '500' }}>Reliable Services at Your Doorstep</span>
//           </p>
          
//           {/* Stats Row */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//             gap: '20px',
//             marginTop: '40px'
//           }}>
//             {statsData.map((stat, index) => (
//               <div key={index} style={{
//                 background: 'rgba(255, 255, 255, 0.1)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                 borderRadius: '15px',
//                 padding: '20px',
//                 textAlign: 'center',
//                 transition: 'all 0.3s ease',
//                 cursor: 'pointer'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//               }}>
//                 <div style={{ fontSize: '1.5rem', color: 'white', marginBottom: '8px' }}>
//                   {stat.icon}
//                 </div>
//                 <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '5px' }}>
//                   {stat.number}
//                 </div>
//                 <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Service Categories */}
//       <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
//         <h2 style={{
//           color: 'white',
//           textAlign: 'center',
//           fontSize: '2.5rem',
//           fontWeight: '600',
//           marginBottom: '50px',
//           textShadow: '0 4px 8px rgba(0,0,0,0.3)'
//         }}>
//           Explore Service Categories
//         </h2>

//         {error && (
//           <div style={{
//             background: 'rgba(220, 53, 69, 0.2)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(220, 53, 69, 0.3)',
//             borderRadius: '15px',
//             padding: '15px',
//             color: 'white',
//             textAlign: 'center',
//             marginBottom: '30px'
//           }}>
//             {error}
//           </div>
//         )}

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//           gap: '30px',
//           marginBottom: '60px'
//         }}>
//           {categories.length > 0 ? (
//             categories.map((cat) => {
//               const catName = String(cat?.name || '').toLowerCase();
//               return (
//                 <div
//                   key={cat._id}
//                   style={{
//                     background: 'rgba(255, 255, 255, 0.15)',
//                     backdropFilter: 'blur(20px)',
//                     WebkitBackdropFilter: 'blur(20px)',
//                     border: '1px solid rgba(255, 255, 255, 0.2)',
//                     borderRadius: '25px',
//                     padding: '30px',
//                     textAlign: 'center',
//                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                     cursor: 'pointer',
//                     boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//                     position: 'relative',
//                     overflow: 'hidden'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
//                     e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
//                     e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.2)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                     e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
//                     e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
//                   }}
//                   onClick={() => handleBookClick(cat?.name || '')}
//                 >
//                   <div style={{ position: 'relative', zIndex: 1 }}>
//                     <div style={{
//                       width: '120px',
//                       height: '120px',
//                       borderRadius: '20px',
//                       background: 'rgba(255, 255, 255, 0.2)',
//                       margin: '0 auto 25px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '3rem',
//                       border: '2px solid rgba(255, 255, 255, 0.3)',
//                       transition: 'all 0.3s ease'
//                     }}>
//                       <span style={{ color: 'white' }}>🔧</span>
//                     </div>
                    
//                     <h3 style={{
//                       color: 'white',
//                       fontSize: '1.5rem',
//                       fontWeight: '600',
//                       marginBottom: '15px'
//                     }}>
//                       {cat?.name || 'Service'}
//                     </h3>
                    
//                     <p style={{
//                       color: 'rgba(255,255,255,0.8)',
//                       fontSize: '0.95rem',
//                       marginBottom: '25px',
//                       lineHeight: '1.5'
//                     }}>
//                       Professional {catName} services at your doorstep. Trusted, verified, and affordable.
//                     </p>
                    
//                     <button
//                       style={{
//                         background: 'rgba(255, 255, 255, 0.2)',
//                         backdropFilter: 'blur(10px)',
//                         border: '1px solid rgba(255, 255, 255, 0.3)',
//                         color: 'white',
//                         padding: '12px 30px',
//                         borderRadius: '25px',
//                         fontSize: '1rem',
//                         fontWeight: '500',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s ease',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: '8px',
//                         margin: '0 auto',
//                         minWidth: '150px'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
//                         e.currentTarget.style.transform = 'scale(1.05)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
//                         e.currentTarget.style.transform = 'scale(1)';
//                       }}
//                     >
//                       Book {cat?.name}
//                       <span style={{ marginLeft: '8px' }}>→</span>
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div style={{
//               gridColumn: '1 / -1',
//               textAlign: 'center',
//               padding: '60px',
//               color: 'rgba(255,255,255,0.7)',
//               fontSize: '1.2rem'
//             }}>
//               Loading amazing services for you...
//             </div>
//           )}
//         </div>

//         {/* Most Booked Services Slider */}
//         <div style={{ marginBottom: '60px' }}>
//           <h2 style={{
//             color: 'white',
//             textAlign: 'center',
//             fontSize: '2.5rem',
//             fontWeight: '600',
//             marginBottom: '40px',
//             textShadow: '0 4px 8px rgba(0,0,0,0.3)'
//           }}>
//             Most Booked Services
//           </h2>

//           <div style={{
//             position: 'relative',
//             maxWidth: '800px',
//             margin: '0 auto',
//             background: 'rgba(255, 255, 255, 0.1)',
//             backdropFilter: 'blur(20px)',
//             borderRadius: '30px',
//             padding: '40px',
//             border: '1px solid rgba(255, 255, 255, 0.2)',
//             boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
//           }}>
//             {/* Slider Container */}
//             <div style={{ 
//               overflow: 'hidden', 
//               borderRadius: '20px',
//               position: 'relative',
//               height: '300px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 transform: `translateX(-${currentSlide * 100}%)`,
//                 transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
//                 height: '100%'
//               }}>
//                 {sliderItems.map((item, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       minWidth: '100%',
//                       height: '100%',
//                       position: 'relative',
//                       background: `linear-gradient(45deg, #6366f1, #8b5cf6)`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <div style={{
//                       background: 'rgba(0,0,0,0.6)',
//                       backdropFilter: 'blur(10px)',
//                       padding: '30px',
//                       borderRadius: '20px',
//                       textAlign: 'center',
//                       border: '1px solid rgba(255,255,255,0.2)'
//                     }}>
//                       <h3 style={{
//                         color: 'white',
//                         fontSize: '2rem',
//                         fontWeight: '700',
//                         marginBottom: '10px'
//                       }}>
//                         {item.title}
//                       </h3>
//                       <p style={{ 
//                         color: 'rgba(255,255,255,0.9)',
//                         fontSize: '1.1rem' 
//                       }}>
//                         Professional & Trusted Service
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <button
//               onClick={prevSlide}
//               style={{
//                 position: 'absolute',
//                 left: '15px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'rgba(255, 255, 255, 0.2)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255, 255, 255, 0.3)',
//                 borderRadius: '50%',
//                 width: '50px',
//                 height: '50px',
//                 color: 'white',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '1.2rem',
//                 transition: 'all 0.3s ease',
//                 zIndex: 2
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
//               onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
//             >
//               ‹
//             </button>
//             <button
//               onClick={nextSlide}
//               style={{
//                 position: 'absolute',
//                 right: '15px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'rgba(255, 255, 255, 0.2)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255, 255, 255, 0.3)',
//                 borderRadius: '50%',
//                 width: '50px',
//                 height: '50px',
//                 color: 'white',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '1.2rem',
//                 transition: 'all 0.3s ease',
//                 zIndex: 2
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
//               onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
//             >
//               ›
//             </button>

//             {/* Dots Indicator */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '10px',
//               marginTop: '25px'
//             }}>
//               {sliderItems.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   style={{
//                     width: '12px',
//                     height: '12px',
//                     borderRadius: '50%',
//                     border: 'none',
//                     background: currentSlide === index 
//                       ? 'rgba(255, 255, 255, 0.8)' 
//                       : 'rgba(255, 255, 255, 0.3)',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer style={{
//         background: 'rgba(0, 0, 0, 0.3)',
//         backdropFilter: 'blur(20px)',
//         WebkitBackdropFilter: 'blur(20px)',
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//         padding: '60px 20px 30px',
//         marginTop: '60px'
//       }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//             gap: '40px',
//             marginBottom: '40px'
//           }}>
//             <div>
//               <h5 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>
//                 NearbyHelper Company
//               </h5>
//               <ul style={{ listStyle: 'none', padding: 0 }}>
//                 {['About us', 'Investor Relations', 'Terms & Conditions', 'Privacy policy', 'Anti-discrimination policy', 'ESG Impact', 'Careers'].map((item, index) => (
//                   <li key={index} style={{
//                     color: 'rgba(255,255,255,0.8)',
//                     marginBottom: '10px',
//                     cursor: 'pointer',
//                     transition: 'color 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
//                   onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h5 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>
//                 For customers
//               </h5>
//               <ul style={{ listStyle: 'none', padding: 0 }}>
//                 {['NBH reviews', 'Categories near you', 'Contact us'].map((item, index) => (
//                   <li key={index} style={{
//                     color: 'rgba(255,255,255,0.8)',
//                     marginBottom: '10px',
//                     cursor: 'pointer',
//                     transition: 'color 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
//                   onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h5 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>
//                 For professionals
//               </h5>
//               <ul style={{ listStyle: 'none', padding: 0 }}>
//                 <li style={{
//                   color: 'rgba(255,255,255,0.8)',
//                   marginBottom: '10px',
//                   cursor: 'pointer',
//                   transition: 'color 0.3s ease'
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
//                 onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
//                 >
//                   Register as a professional
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h5 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px' }}>
//                 Follow us
//               </h5>
//               <div style={{ display: 'flex', gap: '15px' }}>
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     title={social.name}
//                     style={{
//                       background: 'rgba(255, 255, 255, 0.1)',
//                       backdropFilter: 'blur(10px)',
//                       border: '1px solid rgba(255, 255, 255, 0.2)',
//                       borderRadius: '50%',
//                       width: '45px',
//                       height: '45px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: 'white',
//                       fontSize: social.icon.length === 1 ? '1.2rem' : '1rem',
//                       textDecoration: 'none',
//                       transition: 'all 0.3s ease',
//                       fontWeight: 'bold'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
//                       e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
//                       e.currentTarget.style.borderColor = social.color;
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                       e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                       e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
//                     }}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <hr style={{ 
//             border: 'none', 
//             height: '1px', 
//             background: 'rgba(255,255,255,0.2)', 
//             margin: '40px 0 30px' 
//           }} />
//           <p style={{ 
//             textAlign: 'center', 
//             color: 'rgba(255,255,255,0.8)', 
//             fontSize: '1rem',
//             margin: 0 
//           }}>
//             © {new Date().getFullYear()} NearbyHelper. All Rights Reserved.
//           </p>
//         </div>
//       </footer>

//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px) rotate(0deg); }
//             33% { transform: translateY(-30px) rotate(120deg); }
//             66% { transform: translateY(20px) rotate(240deg); }
//           }
          
//           @media (max-width: 768px) {
//             .hero h1 { font-size: 2.5rem !important; }
//             .categories-grid { grid-template-columns: 1fr !important; }
//             .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default UserDashboard;