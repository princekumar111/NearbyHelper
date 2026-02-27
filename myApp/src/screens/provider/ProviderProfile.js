import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import API from "../../api/api";

export default function ProviderProfile({ navigation }) {
  const [category, setCategory] = useState("");
  const [contact, setContact] = useState("");
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);

  const submitProfile = async () => {
    if (!category || !contact) {
      Alert.alert("Validation", "Category & Contact required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/providers/upsert", {
        category,
        contact,
        availability,
        lat: 28.61,   // dummy for now
        lng: 77.20,
      });

      Alert.alert("Success", "Profile saved");
      navigation.replace("Dashboard");
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.msg || "Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Provide Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Service Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submitProfile}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Save Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
