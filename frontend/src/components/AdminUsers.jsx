import React, { useEffect, useState } from 'react';
import API from '../utils/axios';  // your axios instance import
// import Navbar from './Navbar'; // optional

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const res = await API.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);

      if (err.response?.data?.msg === 'Token is not valid' || err.message.includes('jwt expired')) {
        alert('Session expired, please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      } else {
        setError('Failed to load users.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setDeletingUserId(id);
    try {
      const token = localStorage.getItem('adminToken');
      await API.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <>
      {/* <Navbar role="admin" /> */}
      <div className="container py-5">
        <h3 className="mb-4">Registered Users</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div>Loading users...</div>
        ) : (
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || '-'}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={deletingUserId === user._id}
                        onClick={() => deleteUser(user._id)}
                      >
                        {deletingUserId === user._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminUsers;
