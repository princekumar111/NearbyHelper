import axios from "axios";

export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const res = await axios.get(url, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "NearbyHelperApp/1.0 (your-email@example.com)"
      }
    });

    if (res.data && res.data.display_name) {
      return res.data.display_name;
    } else {
      return "Address not available";
    }
  } catch (err) {
    console.error("Reverse Geocode Error:", err);
    return "Address not available";
  }
};
