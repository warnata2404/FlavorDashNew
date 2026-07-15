import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Page Not Found",
        }}
      />

      <View style={styles.container}>
        <Text style={styles.icon}>🔍</Text>

        <Text style={styles.title}>404</Text>

        <Text style={styles.heading}>Page Not Found</Text>

        <Text style={styles.description}>
          The page you are trying to access does not exist or has been moved.
        </Text>

        <Link href="/" style={styles.link}>
          Back to Home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: Spacing.screenPadding,

    backgroundColor: Colors.background,
  },

  icon: {
    fontSize: 64,

    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.heading1,

    color: Colors.primary,

    fontWeight: "700",
  },

  heading: {
    ...Typography.heading3,

    color: Colors.text,

    marginTop: Spacing.sm,
  },

  description: {
    ...Typography.body,

    color: Colors.textSecondary,

    textAlign: "center",

    marginTop: Spacing.md,

    marginBottom: Spacing.xl,

    lineHeight: 24,

    maxWidth: 320,
  },

  link: {
    ...Typography.button,

    color: Colors.primary,
  },
});
