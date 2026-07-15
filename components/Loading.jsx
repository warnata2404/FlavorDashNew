import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function Loading({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={Colors.primary} />

        <Text style={styles.title}>Please wait</Text>

        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.background,

    padding: Spacing.screenPadding,
  },

  card: {
    width: "100%",

    backgroundColor: Colors.white,

    borderRadius: Spacing.borderRadius,

    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,

    alignItems: "center",

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  title: {
    ...Typography.heading3,

    color: Colors.text,

    marginTop: Spacing.lg,
  },

  message: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,

    marginTop: Spacing.sm,

    textAlign: "center",
  },
});
