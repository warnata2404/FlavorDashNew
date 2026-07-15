import { Pressable, StyleSheet, Text } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function AppButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    backgroundColor: Colors.disabled,
  },

  title: {
    ...Typography.button,
    color: Colors.white,
  },
});
