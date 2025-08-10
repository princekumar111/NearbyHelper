import React, { useState } from 'react';

const ViewProviderProfile = () => {
  // Dummy profile data
  const [profile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    service: 'Electrician',
    location: 'New York',
    status: 'Approved',
  });

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Name:</strong> {profile.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
        <li className="list-group-item"><strong>Service:</strong> {profile.service}</li>
        <li className="list-group-item"><strong>Location:</strong> {profile.location}</li>
        <li className="list-group-item"><strong>Status:</strong> {profile.status}</li>
      </ul>
    </div>
  );
};

export default ViewProviderProfile;
