import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function EmptyState({
  title = "No Data",
  message = "There is no data available.",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🍽️</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    padding: Spacing.screenPadding,

    backgroundColor: Colors.background,
  },

  icon: {
    fontSize: 56,

    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.heading3,

    color: Colors.text,

    textAlign: "center",
  },

  message: {
    ...Typography.body,

    color: Colors.textSecondary,

    textAlign: "center",

    marginTop: Spacing.md,

    lineHeight: 24,

    maxWidth: 300,
  },
});
