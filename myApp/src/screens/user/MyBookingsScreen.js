import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function MyBookingsScreen() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/user")
      .then((res) => setBookings(res.data.bookings || []))
      
      .catch((err) => console.log("Booking error", err.message));
  }, []);
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* PROVIDER NAME */}
      <Text style={styles.providerName}>
        {item.provider?.userId?.name || "Provider"}
      </Text>

      {/* CATEGORY */}
      <Text style={styles.category}>
        {item.provider?.category}
      </Text>

      {/* DATE */}
      <Text style={styles.date}>
        📅 {new Date(item.date).toDateString()}
      </Text>

      {/* STATUS */}
      <Text
        style={[
          styles.status,
          item.status === "completed"
            ? styles.completed
            : styles.pending,
        ]}
      >
        Status: {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.heading}>My Bookings</Text>

        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No bookings found
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  container: {
    flex: 1,
    padding: 16,
  },

  heading: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    color: "#111",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  providerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  category: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  date: {
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
  },

  status: {
    marginTop: 8,
    fontWeight: "700",
    fontSize: 13,
  },

  completed: {
    color: "#10B981",
  },

  pending: {
    color: "#F59E0B",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },
});
