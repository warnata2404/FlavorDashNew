import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function SectionHeader({ title, subtitle, rightText = null }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-end",

    paddingHorizontal: Spacing.screenPadding,

    marginTop: Spacing.xl,

    marginBottom: Spacing.lg,
  },

  left: {
    flex: 1,
  },

  title: {
    ...Typography.heading2,

    color: Colors.text,

    fontWeight: "700",
  },

  subtitle: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,

    marginTop: 2,
  },

  rightText: {
    ...Typography.bodySmall,

    color: Colors.primary,

    fontWeight: "700",
  },
});
