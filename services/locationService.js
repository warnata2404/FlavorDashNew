import * as Location from "expo-location";

export async function requestLocationPermission() {
  const permission = await Location.requestForegroundPermissionsAsync();

  return permission;
}

export async function getCurrentLocation() {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return location;
}
