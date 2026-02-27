import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // ✅ LOGIN (FINAL – BACKEND MATCH)
  // ==============================
  const login = async (email, password) => {
    try {
      console.log("SENDING LOGIN REQUEST");

      // 1️⃣ Login → get token
      const res = await API.post("/auth/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token;
      if (!token) {
        throw new Error("Token not received from login");
      }

      // 2️⃣ Save token
      await AsyncStorage.setItem("token", token);

      // 3️⃣ Fetch logged-in user profile
      const profileRes = await API.get("/users/profile");

      console.log("PROFILE RESPONSE:", profileRes.data);

      // 4️⃣ Set user (must contain role)
      setUser(profileRes.data);

    } catch (err) {
      console.log("LOGIN ERROR:", err.message);
      throw err;
    }
  };

  // ==============================
  // 📝 REGISTER
  // ==============================
  const register = async (data) => {
    const res = await API.post("/users/register", data);

    const token = res.data.token;
    if (!token) {
      throw new Error("Token not received from register");
    }

    await AsyncStorage.setItem("token", token);

    const profileRes = await API.get("/users/profile");
    setUser(profileRes.data);
  };

  // ==============================
  // 🚪 LOGOUT
  // ==============================
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  // ==============================
  // 🔄 LOAD USER ON APP START
  // ==============================
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await API.get("/users/profile");
      setUser(res.data);
    } catch (err) {
      await AsyncStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
