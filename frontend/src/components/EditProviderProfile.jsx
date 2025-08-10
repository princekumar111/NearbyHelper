import React, { useState } from 'react';

const EditProviderProfile = () => {
  // Initialize with dummy data
  const [formData, setFormData] = useState({
    name: 'John Doe',
    service: 'Electrician',
    location: 'New York',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert('Profile updated successfully!\n' + JSON.stringify(formData, null, 2));
    // Here you would normally send the data to backend
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Service</label>
          <input
            type="text"
            className="form-control"
            name="service"
            value={formData.service}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditProviderProfile;
