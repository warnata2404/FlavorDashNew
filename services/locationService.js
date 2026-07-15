import * as Location from "expo-location";

export async function requestLocationPermission() {
  return await Location.requestForegroundPermissionsAsync();
}

export async function getCurrentLocation() {
  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
}

export async function getLocationAddress(latitude, longitude) {
  const results = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  if (!results.length) {
    return null;
  }

  return results[0];
}
