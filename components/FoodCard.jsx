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
        <View style={styles.badge}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {category}
          </Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          Fresh ingredients with delicious taste, ready to enjoy anytime.
        </Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>

            <Text style={styles.price}>{formatCurrency(price)}</Text>
          </View>

          <View style={styles.detailButton}>
            <Text style={styles.detailText}>Detail →</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,

    borderRadius: 20,

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

    elevation: 4,
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  image: {
    width: "100%",
    height: 210,

    backgroundColor: Colors.surface,
  },

  content: {
    padding: Spacing.xl,
  },

  badge: {
    alignSelf: "flex-start",

    backgroundColor: "#FFF4EB",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
  },

  badgeText: {
    ...Typography.caption,

    color: Colors.primary,

    fontWeight: "700",
  },

  name: {
    ...Typography.heading3,

    color: Colors.text,

    marginTop: Spacing.md,
  },

  description: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,

    marginTop: Spacing.sm,

    lineHeight: 20,
  },

  footer: {
    marginTop: Spacing.xl,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-end",
  },

  priceLabel: {
    ...Typography.caption,

    color: Colors.textSecondary,
  },

  price: {
    ...Typography.heading3,

    color: Colors.primary,

    marginTop: 2,
  },

  detailButton: {
    backgroundColor: Colors.primary,

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 12,
  },

  detailText: {
    ...Typography.bodySmall,

    color: Colors.white,

    fontWeight: "700",
  },
});
