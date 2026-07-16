import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "../../../components/AppButton";
import Routes from "../../../navigation/routes";
import { Colors, Spacing, Typography } from "../../../styles";

export default function OrderConfirmationScreen() {
  const { orderId, foodName } = useLocalSearchParams();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
          <Text style={styles.icon}>✅</Text>
        </View>

        <Text style={styles.title}>Order Successful</Text>

        <Text style={styles.message}>
          Thank you for your order. Your food has been received and is now being
          prepared by our kitchen.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>#{orderId}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Food Menu</Text>
          <Text style={styles.value}>{foodName}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>🍳 Preparing</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Next Steps</Text>

        <View style={styles.stepRow}>
          <Text style={styles.stepIcon}>📷</Text>
          <Text style={styles.stepText}>
            Capture your food using the Camera feature.
          </Text>
        </View>

        <View style={styles.stepRow}>
          <Text style={styles.stepIcon}>📍</Text>
          <Text style={styles.stepText}>
            View the restaurant location on the map.
          </Text>
        </View>

        <View style={styles.stepRow}>
          <Text style={styles.stepIcon}>🏠</Text>
          <Text style={styles.stepText}>
            Return to the home page to continue browsing.
          </Text>
        </View>
      </View>

      <AppButton
        title="Open Camera"
        onPress={() => router.push(Routes.CAMERA)}
      />

      <View style={styles.gap} />

      <AppButton
        title="View Restaurant Location"
        onPress={() => router.push(Routes.MAP)}
      />

      <View style={styles.gap} />

      <AppButton
        title="Back to Home"
        onPress={() => router.replace(Routes.HOME)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flexGrow: 1,
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },

  successContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  successIconContainer: {
    width: 90,
    height: 90,

    borderRadius: 45,

    backgroundColor: "#EAFBF1",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: Spacing.lg,
  },

  icon: {
    fontSize: 46,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
    textAlign: "center",
  },

  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: Spacing.md,
    lineHeight: 24,
    paddingHorizontal: Spacing.sm,
  },

  card: {
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

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "700",
  },

  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
  },

  statusText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: "700",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },

  stepIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },

  stepText: {
    flex: 1,
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  gap: {
    height: Spacing.md,
  },
});
