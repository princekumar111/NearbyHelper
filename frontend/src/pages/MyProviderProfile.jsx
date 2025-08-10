// import React, { useEffect, useState } from "react";
// import API from "../utils/axios";
// import Navbar from "../components/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MyProviderProfile = () => {
//   const [provider, setProvider] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     location: "",
//     contact: "",
//     bio: "",
//     category: "",
//     availability: false,
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/providers/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setProvider(res.data);
//         setFormData({
//           name: res.data.name || "",
//           email: res.data.email || "",
//           location: res.data.location || "",
//           contact: res.data.contact || "",
//           bio: res.data.bio || "",
//           category: res.data.category || "",
//           availability: res.data.availability || false,
//         });
//       } catch (err) {
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.put("/providers/profile", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setProvider(res.data);
//       setIsEditing(false);
//     } catch (err) {
//       alert("Failed to update profile.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="d-flex vh-100 justify-content-center align-items-center">
//         <div className="spinner-border text-primary" role="status" />
//         <span className="ms-3">Loading profile...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="d-flex vh-100 justify-content-center align-items-center text-danger">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar role="provider" />
//       <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
//         <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
//           <img
//             src={provider?.image || "/default-avatar.png"}
//             alt="Profile"
//             className="rounded-circle mx-auto mb-3"
//             style={{ width: "120px", height: "120px", objectFit: "cover" }}
//           />

//           {!isEditing ? (
//             <>
//               <h3 className="text-center">{provider.name}</h3>
//               <hr />
//               <p><strong>Email:</strong> {provider.email}</p>
//               <p><strong>Location:</strong> {provider.location}</p>
//               <p><strong>Contact:</strong> {provider.contact}</p>
//               <p><strong>Bio:</strong> {provider.bio}</p>
//               <p><strong>Services:</strong> {provider.category}</p>
//               <p><strong>Availability:</strong> {provider.availability ? "Available" : "Unavailable"}</p>

//               <button className="btn btn-primary mt-3 w-100" onClick={handleEditToggle}>
//                 Edit Profile
//               </button>
//             </>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <h4 className="text-center mb-3">Edit Profile</h4>

//               <div className="mb-2">
//                 <label className="form-label">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="form-label">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   className="form-control"
//                   value={formData.location}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="form-label">Contact</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   className="form-control"
//                   value={formData.contact}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="form-label">Bio</label>
//                 <textarea
//                   name="bio"
//                   className="form-control"
//                   value={formData.bio}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="form-label">Services</label>
//                 <input
//                   type="text"
//                   name="category"
//                   className="form-control"
//                   value={formData.category}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   name="availability"
//                   id="availability"
//                   checked={formData.availability}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="availability">
//                   Available
//                 </label>
//               </div>

//               <button type="submit" className="btn btn-success w-100">
//                 Save Changes
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-secondary mt-2 w-100"
//                 onClick={handleEditToggle}
//               >
//                 Cancel
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyProviderProfile;
import React, { useEffect, useRef, useState } from "react";
import API from "../utils/axios";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    contact: "",
    bio: "",
    category: "",
    availability: false,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/providers/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProvider(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          location: res.data.location || "",
          contact: res.data.contact || "",
          bio: res.data.bio || "",
          category: res.data.category || "",
          availability: res.data.availability || false,
        });
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/providers/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProvider(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const handleImageClick = () => {
    if (provider) fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!provider?._id) {
      console.error("Provider ID missing.");
      alert("Provider ID not available yet.");
      return;
    }

    const imageForm = new FormData();
    imageForm.append("image", file);

    try {
      const res = await API.put(
        `/providers/${provider._id}/upload-image`,
        imageForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProvider(res.data.provider);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(
        "Image upload failed: " +
          (err.response?.data?.message || "Unknown error")
      );
    }
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center text-danger">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar role="provider" />
      <div className="container py-5 d-flex justify-content-center align-items-center flex-column">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="text-center">
            {provider ? (
              <img
                src={provider.image || "/default-avatar.png"}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              />
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                Loading...
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          {!isEditing ? (
            <>
              <h3 className="text-center">{provider.name}</h3>
              <hr />
              <p><strong>Email:</strong> {provider.email}</p>
              <p><strong>Location:</strong> {provider.location}</p>
              <p><strong>Contact:</strong> {provider.contact}</p>
              {/* <p><strong>Bio:</strong> {provider.bio}</p> */}
              <p><strong>Services:</strong> {provider.category}</p>
              <p><strong>Availability:</strong> {provider.availability ? "Available" : "Unavailable"}</p>

              <button className="btn btn-primary mt-3 w-100" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h4 className="text-center mb-3">Edit Profile</h4>

              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="mb-2">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-control"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div> */}

              {/* <div className="mb-2">
                <label className="form-label">Services</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div> */}

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="availability"
                  id="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="availability">
                  Available
                </label>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Save Changes
              </button>

              <button
                type="button"
                className="btn btn-secondary mt-2 w-100"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProviderProfile;


