import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import API from "../../api/api";

export default function BookServiceScreen({ route, navigation }) {
  const { providerId } = route.params;

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const bookService = async () => {
    if (!date) {
      Alert.alert("Validation", "Please enter booking date");
      return;
    }

    try {
      setLoading(true);

      await API.post("/bookings", {
        providerId,
        date,
        description,
      });

      Alert.alert("Success", "Booking created successfully");
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.msg || "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Book Service</Text>

        <Text style={styles.label}>Booking Date</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          placeholder="Describe your issue"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={bookService}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
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
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
