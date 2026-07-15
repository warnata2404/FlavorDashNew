import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../styles";
import { formatCurrency } from "../utils/currency";

export default function FoodCard({ name, category, price, image, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <Text style={styles.category} numberOfLines={1} ellipsizeMode="tail">
          {category}
        </Text>

        <Text style={styles.price}>{formatCurrency(price)}</Text>
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
  },

  pressed: {
    opacity: 0.9,
  },

  image: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.surface,
  },

  content: {
    padding: Spacing.cardPadding,
  },

  name: {
    ...Typography.heading3,
    color: Colors.text,
  },

  category: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  price: {
    ...Typography.button,
    color: Colors.primary,
    marginTop: Spacing.md,
  },
});
