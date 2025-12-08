
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import API from '../utils/axios';

// const formatTitle = (str) =>
//   str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// const ProvidersList = () => {
//   const { serviceName } = useParams();
//   const [providers, setProviders] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProviders = async () => {
//       setLoading(true);
//       try {
//         const res = await API.get(`/providers/service/${serviceName}`);
//         setProviders(res.data);
//         setError('');
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load providers.');
//         setProviders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProviders();
//   }, [serviceName]);

//   return (
//     <>
//       <Navbar role="user" />
//       <div className="container py-5">
//         <h2 className="mb-4">Providers for "{formatTitle(serviceName)}"</h2>

//         {loading && <p>Loading providers...</p>}

//         {!loading && error && (
//           <div className="alert alert-danger">{error}</div>
//         )}

//         {!loading && !error && providers.length > 0 ? (
//           <div className="row">
//             {providers.map((provider) => (
//           <div className="col-md-4 mb-4" key={provider._id}>
//   <div className="card shadow-sm text-center p-2" style={{ fontSize: '0.9rem' }}>
//     {/* Circular Image */}
//     <img
//       src={
//         provider.image ||
//         'https://www.sprintdiagnostics.in/images/user.jpg'
//       }
//       alt="Provider"
//       className="rounded-circle mx-auto mb-2"
//       style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//     />

//     {/* Name */}
//     <h6 className="mb-1">{provider.userId?.name || 'Unnamed Provider'}</h6>

//     {/* Info */}
//     <p className="mb-1"><strong>Service:</strong> {provider.category}</p>
//     <p className="mb-1"><strong>Location:</strong> {provider.location}</p>

//     {/* Rating */}
//     {provider.averageRating ? (
//       <p className="mb-1">
//         <strong>Rating:</strong> {provider.averageRating.toFixed(1)} <br />
//         {/* <small>({provider.totalReviews} review{provider.totalReviews > 1 ? 's' : ''})</small> */}
//       </p>
//     ) : (
//       <p className="mb-1"><strong>Rating:</strong> 0.0</p>
//     )}

//     <p>
//   <strong>Availability:</strong>{" "}
//   {provider.availability ? (
//     <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
//   ) : (
//     <span style={{ color: "red", fontWeight: "bold" }}>Not Available</span>
//   )}
// </p>



//     {/* Button */}
//     <button
//       className="btn btn-sm btn-primary mt-2"
//       onClick={() => navigate(`/book/${provider._id}`)}
//     >
//       Book Now
//     </button>
//   </div>
// </div>

//             ))}
//           </div>
//         ) : (
//           !loading && !error && <p>No providers found for this service.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProvidersList;





// new 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/axios";
import { getAddressFromCoordinates } from "../utils/geocode"; // FREE API

const formatTitle = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const ProvidersList = () => {
  const { serviceName } = useParams();
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = () => {
      setLoading(true);

      if (!navigator.geolocation) {
        setError("Location not supported by browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            // Fetch providers based on distance
            const res = await API.post(`/providers/nearby`, {
              lat,
              lng,
              serviceName,
            });

            let providerList = res.data;

            // STEP 2: Convert each provider's lat/lng → address
            providerList = await Promise.all(
              providerList.map(async (p) => {
                if (p.location && p.location.coordinates.length === 2) {
                  const [lng, lat] = p.location.coordinates;
                  const address = await getAddressFromCoordinates(lat, lng);
                  return { ...p, formattedAddress: address };
                }
                return p;
              })
            );

            setProviders(providerList);
            setError("");
          } catch (err) {
            console.error(err);
            setError("Failed to load providers.");
            setProviders([]);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error(err);
          setError("Please allow location access to see nearest providers.");
          setLoading(false);
        }
      );
    };

    fetchProviders();
  }, [serviceName]);

  return (
    <>
      <Navbar role="user" />
      <div className="container py-5">
        <h2 className="mb-4">Providers for "{formatTitle(serviceName)}"</h2>

        {loading && <p>Loading providers...</p>}

        {!loading && error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && providers.length > 0 ? (
          <div className="row">
            {providers.map((provider) => (
              <div className="col-md-4 mb-4" key={provider._id}>
                <div
                  className="card shadow-sm text-center p-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  {/* Provider Image */}
                  <img
                    src={
                      provider.image ||
                      "https://www.sprintdiagnostics.in/images/user.jpg"
                    }
                    alt="Provider"
                    className="rounded-circle mx-auto mb-2"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />

                  {/* Name */}
                  <h6 className="mb-1">
                    {provider.userId?.name || "Unnamed Provider"}
                  </h6>

                  {/* Service */}
                  <p className="mb-1">
                    <strong>Service:</strong> {provider.category}
                  </p>

                  {/* Address (Human readable) */}
                  <p className="mb-1">
                    <strong>Location:</strong>{" "}
                    {provider.formattedAddress || "Loading address..."}
                  </p>

                  {/* Rating */}
                  <p className="mb-1">
                    <strong>Rating:</strong>{" "}
                    {provider.averageRating
                      ? provider.averageRating.toFixed(1)
                      : "0.0"}
                  </p>

                  {/* Availability */}
                  <p>
                    <strong>Availability:</strong>{" "}
                    {provider.availability ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Available
                      </span>
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Not Available
                      </span>
                    )}
                  </p>

                  {/* Distance */}
                  {provider.distance && (
                    <p className="mb-1">
                      <strong>Distance:</strong>{" "}
                      {(provider.distance / 1000).toFixed(2)} km away
                    </p>
                  )}

                  {/* Open in Maps */}
                  {provider.location?.coordinates && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${provider.location.coordinates[1]},${provider.location.coordinates[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.8rem", display: "block" }}
                    >
                      View on Google Maps
                    </a>
                  )}

                  {/* Book Button */}
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => navigate(`/book/${provider._id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p>No providers found for this service.</p>
        )}
      </div>
    </>
  );
};

export default ProvidersList;
