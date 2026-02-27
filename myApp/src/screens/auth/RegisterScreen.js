import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Validation", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      await register(form);
    } catch (err) {
      Alert.alert(
        "Registration Failed",
        err.response?.data?.msg || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 👤</Text>
      <Text style={styles.subtitle}>Register to continue</Text>

      {/* NAME */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
      />

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={form.password}
        onChangeText={(v) => setForm({ ...form, password: v })}
      />

      {/* 🔥 ROLE SELECTION */}
      <Text style={styles.label}>Register as</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleBtn,
            form.role === "user" && styles.activeRole,
          ]}
          onPress={() => setForm({ ...form, role: "user" })}
        >
          <Text
            style={[
              styles.roleText,
              form.role === "user" && styles.activeRoleText,
            ]}
          >
            👤 User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleBtn,
            form.role === "provider" && styles.activeRole,
          ]}
          onPress={() => setForm({ ...form, role: "provider" })}
        >
          <Text
            style={[
              styles.roleText,
              form.role === "provider" && styles.activeRoleText,
            ]}
          >
            🛠 Service Provider
          </Text>
        </TouchableOpacity>
      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },

  /* ROLE */
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  roleBtn: {
    width: "48%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },

  roleText: {
    fontWeight: "700",
    color: "#374151",
  },

  activeRole: {
    backgroundColor: "#4F46E5",
  },

  activeRoleText: {
    color: "#fff",
  },

  /* BUTTON */
  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#374151",
  },

  link: {
    color: "#4F46E5",
    fontWeight: "700",
  },
});
