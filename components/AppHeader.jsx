import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function AppHeader({
  title,
  subtitle,
  authenticated = false,
  onActionPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={onActionPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionText}>
            {authenticated ? "Logout" : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    paddingHorizontal: Spacing.screenPadding,

    paddingTop: 44,
    paddingBottom: Spacing.lg,

    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    paddingRight: Spacing.md,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
    fontWeight: "700",
  },

  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },

  actionButton: {
    minWidth: 76,
    height: 36,

    paddingHorizontal: Spacing.md,

    borderRadius: Spacing.buttonRadius,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    ...Typography.bodySmall,
    color: Colors.white,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.8,
  },
});
