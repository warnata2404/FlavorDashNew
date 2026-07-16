import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../styles";

export default function TabsLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading message="Loading application..." />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,

        tabBarStyle: {
          height: 66,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          switch (route.name) {
            case "index":
              icon = focused ? "home" : "home-outline";
              break;

            case "camera":
              icon = focused ? "camera" : "camera-outline";
              break;

            case "map":
              icon = focused ? "location" : "location-outline";
              break;

            case "orders":
              icon = focused ? "receipt" : "receipt-outline";
              break;

            default:
              icon = "ellipse-outline";
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
        }}
      />
    </Tabs>
  );
}
