import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderDashboard from "../screens/provider/ProviderDashboard";
import ProviderProfile from "../screens/provider/ProviderProfile";

const Stack = createNativeStackNavigator();

export default function ProviderNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={ProviderDashboard}
      />
      <Stack.Screen
        name="Profile"
        component={ProviderProfile}
      />
    </Stack.Navigator>
  );
}
