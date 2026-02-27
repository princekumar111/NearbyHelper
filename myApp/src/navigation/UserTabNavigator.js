// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/user/HomeScreen";
// import MyBookingsScreen from "../screens/user/MyBookingsScreen";
// import BookingHistoryScreen from "../screens/user/BookingHistoryScreen";
// import ProfileScreen from "../screens/user/ProfileScreen";
// import { Text } from "react-native";

// const Tab = createBottomTabNavigator();

// export default function UserTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: 100,
//           paddingBottom: 6,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//         },
//       }}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeScreen}
//         options={{
//           title: "Home",
//           tabBarIcon: () => <Text>🏠</Text>,
//         }}
//       />

//       <Tab.Screen
//         name="MyBookings"
//         component={MyBookingsScreen}
//         options={{
//           title: "Bookings",
//           tabBarIcon: () => <Text>📋</Text>,
//         }}
//       />

//       <Tab.Screen
//         name="History"
//         component={BookingHistoryScreen}
//         options={{
//           title: "History",
//           tabBarIcon: () => <Text>🕘</Text>,
//         }}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           title: "Profile",
//           tabBarIcon: () => <Text>👤</Text>,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }




import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/user/HomeScreen";
import MyBookingsScreen from "../screens/user/MyBookingsScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, paddingBottom: 6 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Text>🏠</Text> }}
      />

      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ tabBarIcon: () => <Text>📘</Text>, title: "Bookings" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}
