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
      <View style={styles.headerCard}>
        <Text style={styles.title}>Restaurant Location</Text>

        <Text style={styles.subtitle}>
          View your current location and nearby restaurant position.
        </Text>
      </View>

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
        <Text style={styles.sectionTitle}>Current Position</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>📍 Address</Text>

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

        <View style={styles.divider} />

        <View style={styles.infoBlock}>
          <Text style={styles.label}>🌍 Coordinates</Text>

          <Text style={styles.coordinate}>{coordinateText}</Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Tips</Text>

        <Text style={styles.tipText}>
          • Enable GPS for higher accuracy.
          {"\n"}• Tap Refresh if your location changes.
          {"\n"}• Pinch the map to zoom in or out.
        </Text>
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

  headerCard: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 22,
  },

  mapCard: {
    overflow: "hidden",

    borderRadius: 20,

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

    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },

  map: {
    width: "100%",
    height: 320,
  },

  infoCard: {
    backgroundColor: Colors.white,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: Colors.border,

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

  infoBlock: {
    gap: Spacing.sm,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },

  label: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: "600",
  },

  value: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },

  coordinate: {
    ...Typography.title,
    color: Colors.primary,
  },

  tipCard: {
    backgroundColor: Colors.white,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: Colors.border,

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

  tipTitle: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  tipText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});
