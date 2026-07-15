import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import AppButton from "../../components/AppButton";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import useLocation from "../../hooks/useLocation";
import { Colors, Spacing, Typography } from "../../styles";

export default function MapScreen() {
  const { location, loading, error, refresh } = useLocation();

  if (loading) {
    return <Loading message="Getting current location..." />;
  }

  if (error) {
    return <EmptyState title="Location Unavailable" message={error} />;
  }

  const { latitude, longitude } = location.coords;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Location</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="Your Location"
          description="Current device location"
        />
      </MapView>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{latitude.toFixed(6)}</Text>

        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{longitude.toFixed(6)}</Text>
      </View>

      <AppButton title="Refresh Location" onPress={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.screenPadding,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  map: {
    width: "100%",
    height: 350,
    borderRadius: Spacing.borderRadius,
    overflow: "hidden",
    marginBottom: Spacing.lg,
  },

  infoCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadius,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.lg,
  },

  label: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },

  value: {
    ...Typography.body,
    color: Colors.text,
  },
});
