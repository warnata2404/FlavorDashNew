import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";
import { formatCurrency } from "../utils/currency";

export default function FoodCard({ name, category, price, image, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>

          <View style={styles.action}>
            <Text style={styles.actionText}>View Detail →</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,

    borderRadius: Spacing.borderRadius,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  image: {
    width: "100%",
    height: 190,
    backgroundColor: Colors.surface,
  },

  content: {
    padding: Spacing.cardPadding,
  },

  categoryContainer: {
    alignSelf: "flex-start",

    backgroundColor: Colors.surface,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,

    borderRadius: 999,
  },

  category: {
    ...Typography.caption,

    color: Colors.secondary,

    fontWeight: "600",
  },

  name: {
    ...Typography.heading3,

    color: Colors.text,

    marginTop: Spacing.md,

    lineHeight: 28,
  },

  footer: {
    marginTop: Spacing.lg,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  price: {
    ...Typography.title,

    color: Colors.primary,

    fontWeight: "700",
  },

  action: {
    backgroundColor: Colors.primary,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,

    borderRadius: Spacing.buttonRadius,
  },

  actionText: {
    ...Typography.caption,

    color: Colors.white,

    fontWeight: "600",
  },
});
