


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import ProviderNavigator from "./ProviderNavigator";
import AdminNavigator from "./AdminNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user && <Stack.Screen name="Auth" component={AuthNavigator} />}

      {user?.role === "user" && (
        <Stack.Screen name="User" component={UserNavigator} />
      )}

      {user?.role === "provider" && (
        <Stack.Screen name="Provider" component={ProviderNavigator} />
      )}

      {user?.role === "admin" && (
        <Stack.Screen name="Admin" component={AdminNavigator} />
      )}
    </Stack.Navigator>
  );
}
