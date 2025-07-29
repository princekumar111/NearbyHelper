


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // 📂 Public pages
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import AdminLogin from './pages/AdminLogin';
// import AdminRegister from './pages/AdminRegister';
// import Unauthorized from './pages/Unauthorized';

// // 👤 User pages
// import UserDashboard from './pages/UserDashboard';
// import BookingPage from './pages/BookingPage';
// import ProvidersList from './pages/ProvidersList';
// import MyBookings from './pages/MyBookings';

// // 🧰 Provider pages
// import ProviderDashboard from './pages/ProviderDashboard';
// import EditProviderProfile from './components/EditProviderProfile';
// import ProviderBookingHistory from './pages/ProviderBookingHistory';
// import ProviderUpsert from './pages/ProviderUpsert';

// // 👑 Admin pages
// import AdminDashboard from './pages/AdminDashboard';
// import AdminUsers from './pages/AdminUsers';
// import AdminProviders from './pages/AdminProviders';
// import AdminBookings from './pages/AdminBookings';
// import ManageUsers from './pages/admin/ManageUser';

// // 🔒 Route guards
// import PrivateRoute from './components/PrivateRoute';
// import PrivateRouteAdmin from './components/PrivateRouteAdmin';

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/*  Public Routes */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/register" element={<AdminRegister />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />

//         {/*  User Protected Routes */}
//         <Route
//           path="/user/dashboard"
//           element={
//             <PrivateRoute allowedRoles={['user']}>
//               <UserDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/user/bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute allowedRoles={['user']}>
//               <UserDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/book/:providerId"
//           element={
//             <PrivateRoute allowedRoles={['user']}>
//               <BookingPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/providers/:serviceName" element={<ProvidersList />} />

//         {/* Provider Protected Routes */}
//         <Route
//           path="/provider/dashboard"
//           element={
//             <PrivateRoute allowedRoles={['provider']}>
//               <ProviderDashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/provider/dashboard/booking-history"
//           element={
//             <PrivateRoute allowedRoles={['provider']}>
//               <ProviderBookingHistory />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/provider/profile/edit"
//           element={
//             <PrivateRoute allowedRoles={['provider']}>
//               <EditProviderProfile />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/provider/detail"
//           element={
//             <PrivateRoute allowedRoles={['provider']}>
//               <ProviderUpsert />
//             </PrivateRoute>
//           }
//         />

//         {/*  Admin Protected Routes */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <PrivateRouteAdmin>
//               <AdminDashboard />
//             </PrivateRouteAdmin>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <PrivateRouteAdmin>
//               <AdminUsers />
//             </PrivateRouteAdmin>
//           }
//         />
//         <Route
//           path="/admin/providers"
//           element={
//             <PrivateRouteAdmin>
//               <AdminProviders />
//             </PrivateRouteAdmin>
//           }
//         />
//         <Route
//           path="/admin/bookings"
//           element={
//             <PrivateRouteAdmin>
//               <AdminBookings />
//             </PrivateRouteAdmin>
//           }
//         />
//         <Route
//           path="/admin/manage-users"
//           element={
//             <PrivateRouteAdmin>
//               <ManageUsers />
//             </PrivateRouteAdmin>
//           }
//         />

//         {/*  Catch-all */}
//         <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📂 Public pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import Unauthorized from './pages/Unauthorized';

// 👤 User pages
import UserDashboard from './pages/UserDashboard';
import BookingPage from './pages/BookingPage';
import ProvidersList from './pages/ProvidersList';
import MyBookings from './pages/MyBookings';

// 🧰 Provider pages
import ProviderDashboard from './pages/ProviderDashboard';
import EditProviderProfile from './components/EditProviderProfile';
import ProviderBookingHistory from './pages/ProviderBookingHistory';
import ProviderUpsert from './pages/ProviderUpsert';

// 👑 Admin pages
import AdminDashboard from './pages/AdminDashboard';
// import AdminUsers from './pages/AdminUsers';
import AdminUsers from './components/AdminUsers';
import AdminProviders from './components/AdminProviders';
import AdminBookings from './components/AdminBookings';
import ManageUsers from './pages/admin/ManageUser';

// 🔒 Route guards
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import MyProviderProfile from './pages/MyProviderProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/bookings"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <MyBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/book/:providerId"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <BookingPage />
            </PrivateRoute>
          }
        />
        <Route path="/providers/:serviceName" element={<ProvidersList />} />

        {/* Provider Routes */}
        <Route
          path="/provider/dashboard"
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/provider/dashboard/booking-history"
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <ProviderBookingHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/provider/profile/edit"
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <EditProviderProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/provider/detail"
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <ProviderUpsert />
            </PrivateRoute>
          }
        />
         <Route
          path="/provider/profile"
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <MyProviderProfile />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteAdmin>
              <AdminDashboard />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRouteAdmin>
              <AdminUsers />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/providers"
          element={
            <PrivateRouteAdmin>
              <AdminProviders />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <PrivateRouteAdmin>
              <AdminBookings />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <PrivateRouteAdmin>
              <ManageUsers />
            </PrivateRouteAdmin>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

