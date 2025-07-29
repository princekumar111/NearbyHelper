
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import API from '../utils/axios';
// // If using stars (optional):
// // import ReactStars from 'react-rating-stars-component';

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
//               <div className="col-md-4 mb-4" key={provider._id}>
//                 <div className="card shadow-sm p-3 h-100">
//                   <h5>{provider.userId?.name || 'Unnamed Provider'}</h5>
//                   <p><strong>Service:</strong> {provider.category || 'N/A'}</p>
//                   <p><strong>Location:</strong> {provider.location || 'Not specified'}</p>
//                   {/* <p>{provider.description || 'No description available.'}</p> */}

//                   {/* ⭐ Show rating if available */}
//                   {provider.averageRating ? (
//                     <p>
//                       <strong>Rating:</strong> {provider.averageRating.toFixed(1)} <br />
//                       <small>({provider.totalReviews} review{provider.totalReviews > 1 ? 's' : ''})</small>

//                       {/* Optional: Fancy stars (uncomment after installing package) */}
//                       {/* <ReactStars
//                         value={provider.averageRating}
//                         count={5}
//                         edit={false}
//                         size={20}
//                         isHalf={true}
//                         activeColor="#ffd700"
//                       /> */}
//                     </p>
//                   ) : (
//                     <p><strong>Rating:</strong> 0.0<br></br></p>
//                   )}

//                   {/* ✅ Book Now Button */}
//                   <button
//                     className="btn btn-primary mt-2 w-100"
//                     onClick={() => navigate(`/book/${provider._id}`)}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
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


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../utils/axios';

const formatTitle = (str) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const ProvidersList = () => {
  const { serviceName } = useParams();
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/providers/service/${serviceName}`);
        setProviders(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load providers.');
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceName]);

  return (
    <>
      <Navbar role="user" />
      <div className="container py-5">
        <h2 className="mb-4">Providers for "{formatTitle(serviceName)}"</h2>

        {loading && <p>Loading providers...</p>}

        {!loading && error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && providers.length > 0 ? (
          <div className="row">
            {providers.map((provider) => (
          <div className="col-md-4 mb-4" key={provider._id}>
  <div className="card shadow-sm text-center p-2" style={{ fontSize: '0.9rem' }}>
    {/* Circular Image */}
    <img
      src={
        provider.image ||
        'https://www.sprintdiagnostics.in/images/user.jpg'
      }
      alt="Provider"
      className="rounded-circle mx-auto mb-2"
      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
    />

    {/* Name */}
    <h6 className="mb-1">{provider.userId?.name || 'Unnamed Provider'}</h6>

    {/* Info */}
    <p className="mb-1"><strong>Service:</strong> {provider.category}</p>
    <p className="mb-1"><strong>Location:</strong> {provider.location}</p>

    {/* Rating */}
    {provider.averageRating ? (
      <p className="mb-1">
        <strong>Rating:</strong> {provider.averageRating.toFixed(1)} <br />
        {/* <small>({provider.totalReviews} review{provider.totalReviews > 1 ? 's' : ''})</small> */}
      </p>
    ) : (
      <p className="mb-1"><strong>Rating:</strong> 0.0</p>
    )}

    <p>
  <strong>Availability:</strong>{" "}
  {provider.availability ? (
    <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>Not Available</span>
  )}
</p>



    {/* Button */}
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
