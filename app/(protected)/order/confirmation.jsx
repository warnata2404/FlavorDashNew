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
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>Order Confirmed</Text>

      <Text style={styles.message}>
        Thank you for your order. Your request has been created successfully.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Order ID</Text>

          <Text style={styles.value}>{orderId}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Food</Text>

          <Text style={styles.value}>{foodName}</Text>
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
    justifyContent: "center",
    padding: Spacing.screenPadding,
  },

  icon: {
    fontSize: 72,
    textAlign: "center",
    marginBottom: Spacing.lg,
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
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },

  card: {
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

  infoRow: {
    justifyContent: "space-between",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },

  label: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  value: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },

  gap: {
    height: Spacing.md,
  },
});
