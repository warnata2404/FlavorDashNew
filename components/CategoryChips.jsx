import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";

function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case "all":
      return "🍽️";

    case "burger":
      return "🍔";

    case "pizza":
      return "🍕";

    case "drink":
      return "🥤";

    case "coffee":
      return "☕";

    case "dessert":
      return "🍰";

    case "chicken":
      return "🍗";

    case "fast food":
      return "🍟";

    case "japanese food":
      return "🍣";

    default:
      return "🍴";
  }
}

export default function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const active = selectedCategory === category;

        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            style={({ pressed }) => [
              styles.card,
              active && styles.activeCard,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                active && styles.activeIconContainer,
              ]}
            >
              <Text style={styles.icon}>{getCategoryIcon(category)}</Text>
            </View>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.label, active && styles.activeLabel]}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.lg,
    paddingRight: Spacing.screenPadding,
  },

  card: {
    width: 100,
    minHeight: 118,

    backgroundColor: Colors.white,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,

    marginRight: Spacing.md,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  activeCard: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  iconContainer: {
    width: 58,
    height: 58,

    borderRadius: 29,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.surface,
  },

  activeIconContainer: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  icon: {
    fontSize: 28,
  },

  label: {
    ...Typography.bodySmall,

    marginTop: Spacing.md,

    textAlign: "center",

    color: Colors.text,

    fontWeight: "600",
  },

  activeLabel: {
    color: Colors.white,
  },

  pressed: {
    opacity: 0.85,
  },
});
