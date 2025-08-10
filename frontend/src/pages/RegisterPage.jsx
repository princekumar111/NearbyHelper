// // src/pages/RegisterPage.jsx
// import React, { useState } from 'react';
// import API from '../utils/axios';
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'user',
//      category: '',
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//            console.log("📤 Form data being sent:", formData);

//     try {
//       const response = await API.post('/users/register', formData);
//       // console.log("✅ Registration response:", response.data);

//       localStorage.setItem('token', response.data.token);
//       alert('Registration successful!');

//       if (formData.role === 'provider') {
//         setTimeout(() => {
//           navigate('/provider/detail');
//         }, 200); // Delay ensures token is stored before navigating
//       } else {
//         navigate('/login');
//       }

//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//       <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
//         <h3 className="text-center mb-4">NearbyHelper Registration</h3>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Register As</label>
//             <select
//               name="role"
//               className="form-select"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="user">User</option>
//               <option value="provider">Service Provider</option>
//             </select>
//           </div>

//           <button type="submit" className="btn btn-success w-100">Register</button>
//         </form>

//         <div className="text-center mt-3">
//           <small>Already have an account? <a href="/login">Login</a></small>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    category: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Form data being sent:", formData);

    try {
      // ✅ Build payload dynamically
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      // ✅ Include category only if provider
      if (formData.role === 'provider') {
        payload.category = formData.category;
      }

      const response = await API.post('/users/register', payload);
      localStorage.setItem('token', response.data.token);
      alert('Registration successful!');

      if (formData.role === 'provider') {
        setTimeout(() => {
          navigate('/provider/detail');
        }, 200); // Delay ensures token is stored before navigating
      } else {
        navigate('/login');
      }

    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">NearbyHelper Registration</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
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
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Register As</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>

          {formData.role === 'provider' && (
            <div className="mb-3">
              <label className="form-label">Service Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Mechanic">Mechanic</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>

        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Login</a></small>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
