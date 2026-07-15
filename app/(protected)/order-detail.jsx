import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import useFoodDetail from "../../hooks/useFoodDetail";
import { Colors, Spacing, Typography } from "../../styles";

export default function OrderDetailScreen() {
  const { foodId } = useLocalSearchParams();

  const { food, loading, error } = useFoodDetail(foodId);

  if (loading) {
    return <Loading message="Loading food detail..." />;
  }

  if (error) {
    return <EmptyState title="Food Not Found" message={error} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: food.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{food.name}</Text>

        <Text style={styles.category}>{food.category}</Text>

        <Text style={styles.price}>{food.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  image: {
    width: "100%",
    height: 260,
    backgroundColor: Colors.surface,
  },

  content: {
    padding: Spacing.screenPadding,
  },

  name: {
    ...Typography.heading2,
    color: Colors.text,
  },

  category: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },

  price: {
    ...Typography.heading3,
    color: Colors.primary,
    marginTop: Spacing.lg,
  },
});
