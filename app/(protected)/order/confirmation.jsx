import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../../../components/AppButton";
import Routes from "../../../navigation/routes";
import { Colors, Spacing, Typography } from "../../../styles";

export default function OrderConfirmationScreen() {
  const { orderId, foodName } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Created</Text>

      <Text style={styles.message}>
        Your order has been created successfully.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>

        <Text style={styles.value}>{orderId}</Text>

        <Text style={styles.label}>Food</Text>

        <Text style={styles.value}>{foodName}</Text>
      </View>

      <AppButton
        title="Open Camera"
        onPress={() => router.push(Routes.CAMERA)}
      />

      <View style={styles.gap} />

      <AppButton title="Open Map" onPress={() => router.push(Routes.MAP)} />

      <View style={styles.gap} />

      <AppButton
        title="Back to Home"
        onPress={() => router.replace(Routes.HOME)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.screenPadding,
    justifyContent: "center",
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.md,
  },

  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },

  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadius,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.xl,
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

  gap: {
    height: Spacing.md,
  },
});
