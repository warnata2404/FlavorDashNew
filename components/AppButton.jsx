import { Pressable, StyleSheet, Text } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function AppButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text
        style={[styles.title, disabled && styles.titleDisabled]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,

    backgroundColor: Colors.primary,

    borderRadius: Spacing.buttonRadius,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  buttonPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    backgroundColor: Colors.disabled,

    shadowOpacity: 0,

    elevation: 0,
  },

  title: {
    ...Typography.button,

    color: Colors.white,

    textAlign: "center",
  },

  titleDisabled: {
    color: Colors.disabledText,
  },
});
