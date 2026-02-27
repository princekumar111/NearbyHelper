import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ProviderDetailScreen({ route, navigation }) {
  const { providerId } = route.params;

  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);

  const loadProvider = async () => {
    try {
      const res = await API.get(`/providers/${providerId}`);
      setProvider(res.data);
    } catch (err) {
      console.log("Provider detail error", err.message);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await API.get(`/reviews/provider/${providerId}`);
      setReviews(res.data);
    } catch (err) {
      console.log("Review error", err.message);
    }
  };

  useEffect(() => {
    loadProvider();
    loadReviews();
  }, []);

  if (!provider) return null;

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* PROVIDER CARD */}
        <View style={styles.card}>
          <Text style={styles.name}>
            {provider.userId?.name || "Provider"}
          </Text>

          <Text style={styles.category}>{provider.category}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>📞 Contact</Text>
            <Text style={styles.value}>{provider.contact}</Text>
          </View>
        </View>

        {/* REVIEWS */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>

        {reviews.length === 0 && (
          <Text style={styles.noReviews}>No reviews yet</Text>
        )}

        {reviews.map((r) => (
          <View key={r._id} style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <Text style={styles.reviewer}>
                {r.user?.name || "User"}
              </Text>
              <Text style={styles.rating}>⭐ {r.rating}</Text>
            </View>

            {r.comment ? (
              <Text style={styles.comment}>{r.comment}</Text>
            ) : null}
          </View>
        ))}

        {/* BOOK BUTTON */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("BookService", {
              providerId: provider._id,
            })
          }
        >
          <Text style={styles.bookText}>Book Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  category: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  infoRow: {
    marginTop: 12,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },

  noReviews: {
    color: "#6B7280",
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  reviewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  reviewer: {
    fontWeight: "600",
    color: "#111",
  },

  rating: {
    fontWeight: "600",
    color: "#F59E0B",
  },

  comment: {
    marginTop: 6,
    color: "#374151",
  },

  bookButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
