import { ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import AppButton from "../../components/AppButton";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import useLocation from "../../hooks/useLocation";
import { Colors, Spacing, Typography } from "../../styles";

export default function MapScreen() {
  const { location, address, loading, error, refresh } = useLocation();

  if (loading) {
    return <Loading message="Getting current location..." />;
  }

  if (error) {
    return <EmptyState title="Location Unavailable" message={error} />;
  }

  const { latitude, longitude } = location.coords;

  const coordinateText = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

  const addressLines = [
    address?.street,
    address?.district,
    address?.subregion,
    address?.city,
    address?.region,
  ].filter(Boolean);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Current Location</Text>

      <Text style={styles.subtitle}>
        Your current device location is displayed below.
      </Text>

      <View style={styles.mapCard}>
        <MapView
          style={styles.map}
          region={{
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
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Location Information</Text>

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Coordinates</Text>

          <Text style={styles.value}>{coordinateText}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoGroup}>
          <Text style={styles.label}>Address</Text>

          {addressLines.length > 0 ? (
            addressLines.map((item, index) => (
              <Text key={index} style={styles.value}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.value}>Address not available.</Text>
          )}
        </View>
      </View>

      <AppButton title="Refresh Location" onPress={refresh} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  mapCard: {
    overflow: "hidden",

    borderRadius: Spacing.borderRadius,

    borderWidth: 1,
    borderColor: Colors.border,

    backgroundColor: Colors.white,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,

    marginBottom: Spacing.xl,
  },

  map: {
    width: "100%",
    height: 350,
  },

  infoCard: {
    backgroundColor: Colors.white,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Spacing.borderRadius,

    padding: Spacing.xl,

    marginBottom: Spacing.xl,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  sectionTitle: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  infoGroup: {
    gap: Spacing.xs,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },

  label: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  value: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
    lineHeight: 24,
  },
});
