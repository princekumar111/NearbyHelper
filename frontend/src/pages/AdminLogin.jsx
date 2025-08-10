// import React, { useState } from 'react';
// import API from '../utils/axios';  // Your axios instance

// const AdminLogin = () => {
//   // const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [alert, setAlert] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAlert('');

//     try {
//       const res = await API.post('/admin/login', formData);
//       console.log(res.data)
//       const { token, admin } = res.data;
      

//       // console.log('✅ Token:', token);
//       // console.log('✅ Admin:', admin);

//       // Store token and user in localStorage
//       localStorage.setItem('adminToken', token);
//       localStorage.setItem('adminData', JSON.stringify(admin));

//       setAlert('Login successful! Redirecting...');

//       // ✅ Use full-page redirect to avoid issues with PrivateRoute
//       setTimeout(() => {
//         window.location.href = '/admin/dashboard'; // <-- Safe redirect
//       }, 1000);

//     } catch (err) {
//       const msg = err.response?.data?.msg || 'Login failed';
//       console.error('❌ Login error:', msg);
//       setAlert(msg);
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: '400px' }}>
//       <h2 className="mb-4">Admin Login</h2>

//       {alert && <div className="alert alert-info">{alert}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">Login</button>
//       </form>

//       <div className="text-center mt-3">
//         <small className="text-muted">
//           Don’t have an account? <a href="/admin/register">Register</a>
//         </small>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import API from '../utils/axios'; // Your axios instance
// import { useNavigate } from 'react-router-dom'; // Optional for SPA redirect

const AdminLogin = () => {
  // const navigate = useNavigate(); // Optional if you want to use navigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setAlert('');
    setLoading(true);

    try {
      const res = await API.post('/admin/login', formData);

      console.log('📦 Full response:', res);
      console.log('✅ res.data:', res.data);

      const { token, admin } = res.data;

      if (!token) {
        console.error('❌ Token not received');
        setAlert('Login failed: No token received');
        return;
      }

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('adminData', JSON.stringify(admin));

      setAlert('✅ Login successful! Redirecting...');

      // Use window.location or navigate()
      setTimeout(() => {
        window.location.href = '/admin/dashboard'; // ✅ Safe full-page redirect
        // OR: navigate('/admin/dashboard'); // If using useNavigate
      }, 1000);

    } catch (err) {
      console.error('❌ Login error:', err);
      const msg = err.response?.data?.msg || 'Login failed';
      setAlert(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Admin Login</h2>

      {alert && (
        <div className={`alert ${alert.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
          {alert}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="text-center mt-3">
        <small className="text-muted">
          Don’t have an account? <a href="/admin/register">Register</a>
        </small>
      </div>
    </div>
  );
};

export default AdminLogin;

