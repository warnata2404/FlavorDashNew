import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function AppHeader({ title, subtitle = null }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,

    borderBottomWidth: 1,
    borderBottomColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  title: {
    ...Typography.heading2,

    color: Colors.text,

    fontWeight: "700",
  },

  subtitle: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,

    marginTop: Spacing.sm,

    lineHeight: 22,
  },
});
