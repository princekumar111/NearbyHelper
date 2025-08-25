// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ role }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (role === 'admin') {
//       localStorage.removeItem('admin');
//       navigate('/admin/login');
//     } else if (role === 'provider') {
//       localStorage.removeItem('provider');
//       navigate('/login');
//     } else {
//       localStorage.removeItem('user');
//       navigate('/login');
//     }
//   };

//   const adminLinks = (
//     <>
//       <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/admin/users">Users</Link>
//       <Link className="nav-link" to="/admin/providers">Providers</Link>
//       <Link className="nav-link" to="/admin/bookings">Bookings</Link>
//     </>
//   );

//   const userLinks = (
//     <>
//       <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
//       <Link className='nav-link' to="/user/bookings">My booking</Link>
//     </>
//   );

//   const providerLinks = (
//     <>
//       <Link className="nav-link" to="/provider/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/provider/dashboard/booking-history">Booking History</Link>
//       <Link className='nav-link' to="/provider/profile">profile</Link>
//     </>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//       <div className="container">
//         <Link className="navbar-brand" to="/">NearbyHelper</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {role === 'admin' && adminLinks}
//             {role === 'user' && userLinks}
//             {role === 'provider' && providerLinks}
//           </ul>
//           <div className="d-flex align-items-center">
//             {role && (
//               <span className="text-light me-3 text-capitalize">
//                 Role: <strong>{role}</strong>
//               </span>
//             )}
//             <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ role }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (role === 'admin') {
//       localStorage.removeItem('admin');
//       navigate('/admin/login');
//     } else if (role === 'provider') {
//       localStorage.removeItem('provider');
//       navigate('/login');
//     } else {
//       localStorage.removeItem('user');
//       navigate('/login');
//     }
//   };

//   const adminLinks = (
//     <>
//       <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/admin/users">Users</Link>
//       <Link className="nav-link" to="/admin/providers">Providers</Link>
//       <Link className="nav-link" to="/admin/bookings">Bookings</Link>
//     </>
//   );

//   const userLinks = (
//     <>
//       <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
//       <Link className='nav-link' to="/user/bookings">My booking</Link>
//     </>
//   );

//   const providerLinks = (
//     <>
//       <Link className="nav-link" to="/provider/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/provider/dashboard/booking-history">Booking History</Link>
//       <Link className='nav-link' to="/provider/profile">profile</Link>
//     </>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-black bg-dark-light mb-4"   style={{ backgroundColor: 'hsl(0, 0%, 90%)' }}>
//       <div className="container">
//         <Link className="navbar-brand" to="/">NearbyHelper</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {role === 'admin' && adminLinks}
//             {role === 'user' && userLinks}
//             {role === 'provider' && providerLinks}
//           </ul>
//           <div className="d-flex align-items-center">
//             {role && (
//               <span className="text-dark me-3 text-capitalize">
//                 Role: <strong>{role}</strong>
//               </span>
//             )}
//             <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;








// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = ({ role }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     if (role === 'admin') {
//       localStorage.removeItem('admin');
//       navigate('/admin/login');
//     } else if (role === 'provider') {
//       localStorage.removeItem('provider');
//       navigate('/login');
//     } else {
//       localStorage.removeItem('user');
//       navigate('/login');
//     }
//   };

//   const adminLinks = (
//     <>
//       <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/admin/users">Users</Link>
//       <Link className="nav-link" to="/admin/providers">Providers</Link>
//       <Link className="nav-link" to="/admin/bookings">Bookings</Link>
//     </>
//   );

//   const userLinks = (
//     <>
//       <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/user/bookings">My Booking</Link>
//     </>
//   );

//   const providerLinks = (
//     <>
//       <Link className="nav-link" to="/provider/dashboard">Dashboard</Link>
//       <Link className="nav-link" to="/provider/dashboard/booking-history">Booking History</Link>
//       <Link className="nav-link" to="/provider/profile">Profile</Link>
//     </>
//   );

//   return (
//     <nav 
//       className="navbar navbar-expand-lg mb-4"
//       style={{ backgroundColor: 'hsl(0, 0%, 90%)' }}
//     >
//       <div className="container">
        
//         {/* ✅ Logo */}
//         {/* <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img 
//             src="/service_images/logo.webp"   
//             // alt="NearbyHelper Logo" 
//             className="logo"
//              style={{ maxHeight: "45px", width: "160px", margin: "10px" }} 
//           /> */}
//            {/* <span className="fw-bold text-dark">NearbyHelper</span> */}
//          {/* </Link>  */}





//          <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img 
//              src="/service_images/logo.webp"
//              alt="NearbyHelper Logo"
//               className="logo"
//              />
//           </Link>







//         {/* ✅ Collapsible Menu */}
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {role === 'admin' && adminLinks}
//             {role === 'user' && userLinks}
//             {role === 'provider' && providerLinks}
//           </ul>

//           {/* ✅ Search Box */}
//           <form className="d-flex me-3">
//             <input 
//               className="form-control me-2" 
//               type="search" 
//               placeholder="Search services..." 
//               aria-label="Search" 
//             />
//             {/* <button className="btn btn-primary" type="submit">Search</button> */}
//           </form>

//           {/* ✅ Role + Logout */}
//           <div className="d-flex align-items-center">
//             {role && (
//               <span className="text-dark me-3 text-capitalize">
//                 Role: <strong>{role}</strong>
//               </span>
//             )}
//             <button className="btn btn-outline-dark" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

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

          {/* Role + Logout */}
          <div className="d-flex align-items-center">
            {role && (
              <span className="text-dark me-3 text-capitalize">
                Role: <strong>{role}</strong>
              </span>
            )}
            <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
