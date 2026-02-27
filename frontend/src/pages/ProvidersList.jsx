



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/axios";
import { getAddressFromCoordinates } from "../utils/geocode";
import BookingPage from "./BookingPage";
import "./ProvidersList.css";

const formatTitle = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// ⭐ Rating component
const RatingStars = ({ rating = 0 }) => {
  const rounded = Math.round(rating);
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rounded ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-text">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProvidersList = () => {
  const { serviceName } = useParams();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Location not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await API.post("/providers/nearby", {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            serviceName,
          });

          const list = await Promise.all(
            res.data.map(async (p) => {
              if (p.location?.coordinates?.length === 2) {
                const [lng, lat] = p.location.coordinates;
                const address = await getAddressFromCoordinates(lat, lng);
                return { ...p, formattedAddress: address };
              }
              return p;
            })
          );

          setProviders(list);
        } catch {
          setError("Failed to load providers.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Please allow location access.");
        setLoading(false);
      }
    );
  }, [serviceName]);

  return (
    <>
      <Navbar role="user" />

      <div className="container py-4">
        <h4 className="mb-4">
          Providers for "{formatTitle(serviceName)}"
        </h4>

        {loading && <p>Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row">
            {providers.map((provider) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                key={provider._id}
              >
                <div className="provider-card card shadow-sm h-100">
                  {/* Image */}
                  <img
                    src={
                      provider.image ||
                      "https://www.sprintdiagnostics.in/images/user.jpg"
                    }
                    alt="Provider"
                    className="provider-img"
                  />

                  {/* Name */}
                  <h5 className="provider-name">
                    {provider.userId?.name || "Provider"}
                  </h5>

                  {/* ⭐ Rating */}
                  <RatingStars
                    rating={provider.averageRating || 0}
                  />

                  {/* Info */}
                  <div className="provider-info">
                    <p>
                      <span>Service:</span> {provider.category}
                    </p>

                    <p>
                      <span>Location:</span>{" "}
                      {provider.formattedAddress || "Loading..."}
                    </p>

                    {provider.distance && (
                      <p>
                        <span>Distance:</span>{" "}
                        {(provider.distance / 1000).toFixed(2)} km away
                      </p>
                    )}

                    <p>
                      <span>Availability:</span>{" "}
                      {provider.availability ? (
                        <span className="available">Available</span>
                      ) : (
                        <span className="not-available">Not Available</span>
                      )}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => setSelectedProviderId(provider._id)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 BOOKING OVERLAY */}
      {selectedProviderId && (
        <div className="booking-overlay">
          <BookingPage
            providerId={selectedProviderId}
            onClose={() => setSelectedProviderId(null)}
          />
        </div>
      )}
    </>
  );
};

export default ProvidersList;
