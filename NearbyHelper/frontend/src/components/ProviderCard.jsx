import React from 'react';
import { Link } from 'react-router-dom';

const ProviderCard = ({ provider }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{provider.name}</h5>
        <p className="card-text">
          <strong>Category:</strong> {provider.category} <br />
          <strong>Location:</strong> {provider.location} <br />
          <strong>Rating:</strong> {provider.rating} <br />
          <strong>Contact:</strong> {provider.contact}
        </p>
        <Link to={`/book/${provider.id}`} className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ProviderCard;
