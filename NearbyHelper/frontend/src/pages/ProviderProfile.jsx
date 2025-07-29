import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';
import Navbar from '../components/Navbar';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await API.get(`/providers/provider/${id}`);
        setProvider(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load provider profile.');
      }
    };

    fetchProvider();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!provider) return <p>Loading...</p>;

  return (
    <>
      <Navbar role="user" />
      <div className="container py-5">
        <h2>{provider.name || 'Unnamed Provider'}</h2>
        <p><strong>Service:</strong> {provider.category}</p>
        <p><strong>Location:</strong> {provider.location}</p>
        <p><strong>Contact:</strong> {provider.contact}</p>
        <p><strong>Description:</strong> {provider.description || 'No description provided.'}</p>
        <button className="btn btn-success mt-3" onClick={() => alert("Booking initiated...")}>
          Book Now
        </button>
      </div>
    </>
  );
};

export default ProviderProfile;
