import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function BookingHistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await API.get("/bookings/user/history");
      setHistory(res.data.bookings || []);
    } catch (err) {
      console.log("History error", err.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking History</Text>

      {history.length === 0 && (
        <Text style={styles.empty}>No past bookings</Text>
      )}

      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.service}>
              {item.providerId?.category}
            </Text>
            <Text>Date: {new Date(item.date).toDateString()}</Text>
            <Text>Status: {item.status}</Text>
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
     paddingBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  service: {
    fontWeight: "700",
    marginBottom: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },
});
