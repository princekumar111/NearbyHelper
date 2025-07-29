


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
//               <div className="row">
//                 {/* Left: User Info */}
//                 <div className="col-md-6 mb-2">
//                   <h6 className="mb-1"><strong>👤 {booking.userId?.name}</strong></h6>
//                   <p className="mb-1 text-muted">📧 {booking.userId?.email}</p>
//                   <p className="mb-1">📝 {booking.description || 'No description provided'}</p>
//                 </div>

//                 {/* Right: Booking Info */}
//                 <div className="col-md-6 mb-2">
//                   <p className="mb-1">🗓 <strong>{new Date(booking.date).toLocaleString()}</strong></p>
//                   <p className="mb-1">
//                     📌 Status: <span className={getStatusBadge(booking.status)}>{booking.status.toUpperCase()}</span>
//                   </p>

//                   {['pending', 'confirmed'].includes(booking.status) && (
//                     <div className="mt-2 d-flex flex-wrap gap-2">
//                       {booking.status === 'pending' && (
//                         <button
//                           className="btn btn-outline-primary btn-sm"
//                           onClick={() => updateStatus(booking._id, 'confirmed')}
//                           disabled={updatingId === booking._id}
//                         >
//                           ✅ Confirm
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-outline-success btn-sm"
//                         onClick={() => updateStatus(booking._id, 'completed')}
//                         disabled={updatingId === booking._id}
//                       >
//                         ✔ Mark Completed
//                       </button>
//                       <button
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => updateStatus(booking._id, 'cancelled')}
//                         disabled={updatingId === booking._id}
//                       >
//                         ✖ Cancel
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default ProviderDashboard;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import API from '../utils/axios';
import Navbar from '../components/Navbar';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem('token');

  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }), [token]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await API.get('/providers/dashboard/upcoming', config);
      console.log(res.data.upcomingBookings);
      setBookings(res.data.upcomingBookings);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  }, [config]);

  const updateStatus = async (bookingId, status) => {
    if (!window.confirm(`Are you sure you want to mark this as '${status}'?`)) return;

    try {
      setUpdatingId(bookingId);
      await API.put(`/bookings/${bookingId}/status`, { status }, config);
      fetchBookings(); // Refresh after update
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge bg-secondary';
      case 'confirmed': return 'badge bg-info text-dark';
      case 'completed': return 'badge bg-success';
      case 'cancelled': return 'badge bg-danger';
      default: return 'badge bg-dark';
    }
  };

  return (
    <>
      <Navbar role="provider" />
      <div className="container py-4">
        <h2 className="mb-4">📅 Upcoming Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : bookings.length === 0 ? (
          <p>No upcoming bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div className="card mb-3 shadow-sm p-3" key={booking._id}>
              <h5>👤 {booking.userId?.name}</h5>
              <p>📧 {booking.userId?.email}</p>
              <p>🗓 {new Date(booking.date).toLocaleString()}</p>
              <p>📝 {booking.description || 'No description provided'}</p>
              <p>
                📌 Status:{' '}
                <span className={getStatusBadge(booking.status)}>
                  {booking.status.toUpperCase()}
                </span>
              </p>

              {['pending', 'confirmed'].includes(booking.status) && (
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {booking.status === 'pending' && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateStatus(booking._id, 'confirmed')}
                      disabled={updatingId === booking._id}
                    >
                      ✅ Confirm
                    </button>
                  )}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(booking._id, 'completed')}
                    disabled={updatingId === booking._id}
                  >
                    ✔ Mark as Completed
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(booking._id, 'cancelled')}
                    disabled={updatingId === booking._id}
                  >
                    ✖ Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProviderDashboard;

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import API from '../utils/axios';
// import Navbar from '../components/Navbar';

// const ProviderDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [updatingId, setUpdatingId] = useState(null);

//   const [profile, setProfile] = useState(null);
//   const [form, setForm] = useState({});
//   const [editing, setEditing] = useState(false);
//   const [viewProfile, setViewProfile] = useState(false);

//   const token = localStorage.getItem('token');

//   const config = useMemo(() => ({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   }), [token]);

//   // Fetch upcoming bookings
//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await API.get('/providers/dashboard/upcoming', config);
//       setBookings(res.data.upcomingBookings);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch bookings.');
//     } finally {
//       setLoading(false);
//     }
//   }, [config]);

//   // Fetch provider profile
//   const fetchProfile = useCallback(async () => {
//     try {
//       const res = await API.get('/providers/profile', config);
//       setProfile(res.data);
//       setForm(res.data);
//     } catch (err) {
//       console.error('Failed to load profile:', err);
//     }
//   }, [config]);

//   const updateStatus = async (bookingId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this as '${status}'?`)) return;

//     try {
//       setUpdatingId(bookingId);
//       await API.put(`/bookings/${bookingId}/status`, { status }, config);
//       fetchBookings();
//     } catch (err) {
//       console.error('Status update failed:', err);
//       alert('Failed to update status');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const handleProfileChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleProfileSave = async () => {
//     try {
//       const res = await API.put('/providers/profile', form, config);
//       alert('Profile updated successfully!');
//       setProfile(res.data);
//       setEditing(false);
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       alert('Failed to update profile');
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchProfile();
//   }, [fetchBookings, fetchProfile]);

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
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2>📅 Upcoming Bookings</h2>
//           <button className="btn btn-outline-primary" onClick={() => setViewProfile(!viewProfile)}>
//             {viewProfile ? '🔙 Back to Dashboard' : '👤 View/Edit Profile'}
//           </button>
//         </div>

//         {viewProfile ? (
//           <>
//             <h4 className="mb-3">👤 Provider Profile</h4>
//             {profile ? (
//               <div className="card p-4 shadow-sm" style={{ maxWidth: '700px', margin: '0 auto' }}>
//   <div className="row">
//     <div className="col-md-6 mb-3">
//       <label className="form-label">Name</label>
//       <input
//         className="form-control"
//         name="name"
//         value={form.name || ''}
//         onChange={handleProfileChange}
//         disabled
//       />
//     </div>
//     <div className="col-md-6 mb-3">
//       <label className="form-label">Email</label>
//       <input
//         className="form-control"
//         name="email"
//         value={form.email || ''}
//         onChange={handleProfileChange}
//         disabled
//       />
//     </div>

//     <div className="col-md-6 mb-3">
//       <label className="form-label">Category</label>
//       <input
//         className="form-control"
//         name="category"
//         value={form.category || ''}
//         onChange={handleProfileChange}
//         disabled={!editing}
//       />
//     </div>
//     <div className="col-md-6 mb-3">
//       <label className="form-label">Location</label>
//       <input
//         className="form-control"
//         name="location"
//         value={form.location || ''}
//         onChange={handleProfileChange}
//         disabled={!editing}
//       />
//     </div>

//     <div className="col-md-6 mb-3">
//       <label className="form-label">Phone</label>
//       <input
//         className="form-control"
//         name="contact"
//         value={form.contact || ''}
//         onChange={handleProfileChange}
//         disabled={!editing}
//       />
//     </div>

//     <div className="col-md-12 mb-3">
//       <label className="form-label">Description</label>
//       <textarea
//         className="form-control"
//         name="description"
//         value={form.description || ''}
//         onChange={handleProfileChange}
//         disabled={!editing}
//         rows={3}
//       />
//     </div>
//   </div>

//   {!editing ? (
//     <button className="btn btn-primary" onClick={() => setEditing(true)}>
//       ✏️ Edit Profile
//     </button>
//   ) : (
//     <div className="d-flex gap-2">
//       <button className="btn btn-success" onClick={handleProfileSave}>💾 Save</button>
//       <button className="btn btn-secondary" onClick={() => {
//         setEditing(false);
//         setForm(profile);
//       }}>❌ Cancel</button>
//     </div>
//   )}
// </div>

//             ) : (
//               <p>Loading profile...</p>
//             )}
//           </>
//         ) : (
//           <>
//             {loading ? (
//               <p>Loading bookings...</p>
//             ) : error ? (
//               <div className="alert alert-danger">{error}</div>
//             ) : bookings.length === 0 ? (
//               <p>No upcoming bookings found.</p>
//             ) : (
//               bookings.map((booking) => (
//                 <div className="card mb-3 shadow-sm p-3" key={booking._id}>
//                   <h5>👤 {booking.userId?.name}</h5>
//                   <p>📧 {booking.userId?.email}</p>
//                   <p>🗓 {new Date(booking.date).toLocaleString()}</p>
//                   <p>📝 {booking.description || 'No description provided'}</p>
//                   <p>
//                     📌 Status:{' '}
//                     <span className={getStatusBadge(booking.status)}>
//                       {booking.status.toUpperCase()}
//                     </span>
//                   </p>

//                   {['pending', 'confirmed'].includes(booking.status) && (
//                     <div className="mt-2 d-flex gap-2 flex-wrap">
//                       {booking.status === 'pending' && (
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => updateStatus(booking._id, 'confirmed')}
//                           disabled={updatingId === booking._id}
//                         >
//                           ✅ Confirm
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-success btn-sm"
//                         onClick={() => updateStatus(booking._id, 'completed')}
//                         disabled={updatingId === booking._id}
//                       >
//                         ✔ Mark as Completed
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => updateStatus(booking._id, 'cancelled')}
//                         disabled={updatingId === booking._id}
//                       >
//                         ✖ Cancel
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProviderDashboard;


// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import API from '../utils/axios';
// import Navbar from '../components/Navbar';

// const ProviderDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   const config = useMemo(() => ({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     }
//   }), [token]);

//   // Fetch Profile
//   const fetchProfile = useCallback(async () => {
//     try {
//       const res = await API.get('/providers/profile', config);
//       setProfile(res.data);
//     } catch (err) {
//       console.error('Profile error:', err);
//     }
//   }, [config]);

//   // Fetch Bookings
//   const fetchBookings = useCallback(async () => {
//     try {
//       const res = await API.get('/providers/dashboard/upcoming', config);
//       setBookings(res.data.upcomingBookings);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch bookings.');
//     } finally {
//       setLoading(false);
//     }
//   }, [config]);

//   // Update Booking Status
//   const updateStatus = async (bookingId, status) => {
//     if (!window.confirm(`Are you sure you want to mark this as '${status}'?`)) return;

//     try {
//       setUpdatingId(bookingId);
//       await API.put(`/bookings/${bookingId}/status`, { status }, config);
//       fetchBookings(); // Refresh
//     } catch (err) {
//       console.error('Status update failed:', err);
//       alert('Failed to update status');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // Upload Image
//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!imageFile || !profile) return alert('Please select an image');

//     const formData = new FormData();
//     formData.append('image', imageFile);

//     try {
//       const res = await API.put(
//         `/providers/${profile._id}/upload-image`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           }
//         }
//       );
//       alert('Image uploaded!');
//       setProfile(res.data.provider);
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert('Image upload failed');
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchBookings();
//   }, [fetchProfile, fetchBookings]);

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
//         <h2 className="mb-3">👤 Provider Profile</h2>

//         {profile && (
//           <div className="card p-3 mb-4 shadow-sm">
//             <div className="d-flex align-items-center gap-3">
//               <img
//                 src={profile.image || 'https://via.placeholder.com/80'}
//                 alt="profile"
//                 className="rounded-circle"
//                 style={{ width: 80, height: 80, objectFit: 'cover' }}
//               />
//               <div>
//                 <h5 className="mb-0">{profile.name}</h5>
//                 <p className="mb-0 text-muted">{profile.email}</p>
//               </div>
//             </div>

//             <form onSubmit={handleImageUpload} className="mt-3">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImageFile(e.target.files[0])}
//                 className="form-control mb-2"
//               />
//               <button className="btn btn-sm btn-primary">📤 Upload Image</button>
//             </form>
//           </div>
//         )}

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
