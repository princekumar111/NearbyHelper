import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export default function ProviderDashboard() {
  const { logout } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await API.get("/providers/dashboard/upcoming");
      setBookings(res.data.upcomingBookings || []);
    } catch (err) {
      console.log("Dashboard error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await API.put(`/bookings/${bookingId}/status`, { status });
      Alert.alert("Success", `Booking ${status}`);
      loadBookings();
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.msg || "Failed to update status"
      );
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔝 HEADER */}
      <View style={styles.header}>
        <Text style={styles.heading}>📋 Provider Dashboard</Text>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {bookings.length === 0 && (
        <Text style={styles.empty}>No upcoming bookings</Text>
      )}

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              👤 {item.userId?.name || "User"}
            </Text>

            <Text>📅 {new Date(item.date).toDateString()}</Text>
            <Text>📝 {item.description || "No description"}</Text>

            <Text style={styles.status}>
              Status: {item.status.toUpperCase()}
            </Text>

            {item.status === "pending" && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.btn, styles.accept]}
                  onPress={() =>
                    updateStatus(item._id, "confirmed")
                  }
                >
                  <Text style={styles.btnText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.reject]}
                  onPress={() =>
                    updateStatus(item._id, "cancelled")
                  }
                >
                  <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === "confirmed" && (
              <TouchableOpacity
                style={[styles.btn, styles.complete]}
                onPress={() =>
                  updateStatus(item._id, "completed")
                }
              >
                <Text style={styles.btnText}>Mark Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FB",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
  },

  logout: {
    color: "#DC2626",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  status: {
    marginTop: 6,
    fontWeight: "600",
    color: "#4F46E5",
  },

  actions: {
    flexDirection: "row",
    marginTop: 10,
  },

  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },

  accept: {
    backgroundColor: "#16A34A",
  },

  reject: {
    backgroundColor: "#DC2626",
  },

  complete: {
    backgroundColor: "#2563EB",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
