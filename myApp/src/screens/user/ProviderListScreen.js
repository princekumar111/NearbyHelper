
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import API from "../../api/api";

export default function ProviderListScreen({ route, navigation }) {
  const { category } = route.params;

  const [providers, setProviders] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // ------------------ GET USER LOCATION (STABLE FOR EXPO) ------------------
  const getUserLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      // First try last known location
      let location = await Location.getLastKnownPositionAsync({});

      // If not available, get fresh location
      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
      }

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      console.log("Location error:", err.message);
    }
  };

  // ------------------ LOAD PROVIDERS ------------------
  const loadProviders = async () => {
    try {
      const res = await API.get(`/providers/service/${category}`);
      setProviders(res.data);
    } catch (err) {
      console.log("Provider error:", err.message);
    }
  };

  // ------------------ DISTANCE CALCULATION ------------------
  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lat2) return null;

    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(
      1
    );
  };

  // ------------------ EFFECT ------------------
  useEffect(() => {
    getUserLocation();
    loadProviders();
  }, []);

  // ------------------ RENDER ITEM ------------------
  const renderItem = ({ item }) => {
    // console.log("UserLocation:", userLocation);
    // console.log("ProviderLocation:", item.location);

    let distance = null;

    // ✅ CORRECT GEOJSON HANDLING
    if (userLocation && item.location?.coordinates) {
      const [providerLng, providerLat] = item.location.coordinates;

      distance = getDistanceKm(
        userLocation.latitude,
        userLocation.longitude,
        providerLat,
        providerLng
      );
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("ProviderDetail", {
            providerId: item._id,
          })
        }
      >
        <View style={styles.topRow}>
          <Text style={styles.name}>
            {item.userId?.name || "Unknown Provider"}
          </Text>
          <Text style={styles.rating}>
            ⭐{" "}
            {item.averageRating
              ? item.averageRating.toFixed(1)
              : "N/A"}
          </Text>
        </View>

        <Text style={styles.category}>{category}</Text>

        {/* 📍 DISTANCE */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>📍 Distance</Text>
          <Text style={styles.value}>
            {distance !== null
              ? `${distance} km away`
              : "Location not available"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📞 Contact</Text>
          <Text style={styles.value}>
            {item.contact || "Not available"}
          </Text>
        </View>

        <View
          style={[
            styles.availabilityBadge,
            item.availability ? styles.available : styles.unavailable,
          ]}
        >
          <Text style={styles.availabilityText}>
            {item.availability ? "🟢 Available" : "🔴 Not Available"}
          </Text>
        </View>

        <Text style={styles.viewMore}>View Details →</Text>
      </TouchableOpacity>
    );
  };

  // ------------------ UI ------------------
  if (!userLocation) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Fetching location...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <Text style={styles.heading}>{category} Providers</Text>

      <FlatList
        data={providers}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No providers available right now
          </Text>
        }
      />
    </SafeAreaView>
  );
}

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fcff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { fontSize: 16, fontWeight: "700" },
  rating: { color: "#F59E0B", fontWeight: "600" },
  category: { marginTop: 4, fontSize: 13, color: "#6B7280" },
  infoRow: { marginTop: 10 },
  label: { fontSize: 13, color: "#6B7280" },
  value: { fontSize: 14, fontWeight: "500" },
  availabilityBadge: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  availabilityText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  available: { backgroundColor: "#10B981" },
  unavailable: { backgroundColor: "#EF4444" },
  viewMore: {
    marginTop: 12,
    color: "#4F46E5",
    fontWeight: "600",
    textAlign: "right",
  },
  emptyText: { textAlign: "center", marginTop: 40 },
});
