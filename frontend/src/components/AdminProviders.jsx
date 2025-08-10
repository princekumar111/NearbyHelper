import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
// import Navbar from '../components/Navbar'; // optional

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }
      const res = await API.get('/admin/providers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setProviders(res.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      } else {
        setError('Failed to load providers.');
      }
      console.error(err);
    }
  };

  const deleteProvider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this provider?')) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`/admin/providers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProviders((prev) => prev.filter((provider) => provider._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting provider:', err);
      setError('Failed to delete provider.');
    }
  };

  return (
     <>
    <div className="container py-5">
      <h3 className="mb-4">Registered Providers</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Catogory</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {providers.length > 0 ? (
            providers.map((provider) => (
              <tr key={provider._id}>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>{provider.role}</td>
                <td>{provider.category}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProvider(provider._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No providers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};


export default AdminProviders;
