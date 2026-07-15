import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function Loading({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />

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

  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    textAlign: "center",
  },
});
