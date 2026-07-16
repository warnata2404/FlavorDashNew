import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

export default function SearchBar({ value, onChangeText, onClear }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌕</Text>

      <TextInput
        style={styles.input}
        placeholder="Search foods..."
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        selectionColor={Colors.primary}
      />

      {value.length > 0 ? (
        <Pressable
          onPress={onClear}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    height: 56,

    backgroundColor: Colors.white,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: Colors.border,

    paddingHorizontal: Spacing.lg,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  icon: {
    width: 24,

    textAlign: "center",

    fontSize: 18,

    color: Colors.textSecondary,

    marginRight: Spacing.md,
  },

  input: {
    flex: 1,

    ...Typography.body,

    color: Colors.text,

    paddingVertical: 0,

    includeFontPadding: false,
  },

  clearButton: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    fontSize: 18,

    fontWeight: "700",

    color: Colors.textSecondary,

    lineHeight: 20,
  },

  pressed: {
    opacity: 0.75,
  },
});
