import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function EmptyState({
  title = "No Data",
  message = "There is no data available.",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>

      <Text style={styles.message} numberOfLines={3} ellipsizeMode="tail">
        {message}
      </Text>
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

  title: {
    ...Typography.heading3,
    color: Colors.text,
    textAlign: "center",
  },

  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: Spacing.sm,
  },
});
