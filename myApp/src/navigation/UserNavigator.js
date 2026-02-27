// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import UserTabNavigator from "./UserTabNavigator";
// import ProviderListScreen from "../screens/user/ProviderListScreen";
// import ProviderDetailScreen from "../screens/user/ProviderDetailScreen";
// import BookServiceScreen from "../screens/user/BookServiceScreen";

// const Stack = createNativeStackNavigator();

// export default function UserNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Tabs" component={UserTabNavigator} />

//       {/* Extra screens */}
//       <Stack.Screen name="Providers" component={ProviderListScreen} />
//       <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
//       <Stack.Screen name="BookService" component={BookServiceScreen} />
//     </Stack.Navigator>
//   );
// }



import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabNavigator from "./UserTabNavigator";

import ProviderListScreen from "../screens/user/ProviderListScreen";
import ProviderDetailScreen from "../screens/user/ProviderDetailScreen";
import BookServiceScreen from "../screens/user/BookServiceScreen";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs always visible */}
      <Stack.Screen name="Tabs" component={UserTabNavigator} />

      {/* Extra screens */}
      <Stack.Screen name="Providers" component={ProviderListScreen} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
      <Stack.Screen name="BookService" component={BookServiceScreen} />
    </Stack.Navigator>
  );
}
