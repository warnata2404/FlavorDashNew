import { FlatList, StyleSheet, View } from "react-native";

import AppHeader from "../components/AppHeader";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loading from "../components/Loading";
import useFoods from "../hooks/useFoods";
import { Colors, Spacing } from "../styles";

export default function HomeScreen() {
  const { foods, loading } = useFoods();

  function handleFoodPress(food) {
    // Navigasi ke halaman Detail Pesanan akan diimplementasikan pada PHASE 08.
    void food;
  }

  if (loading) {
    return <Loading message="Loading foods..." />;
  }

  if (foods.length === 0) {
    return (
      <EmptyState
        title="No Foods Found"
        message="There are no food items available."
      />
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="FlavorDash" subtitle="Discover your favorite foods" />

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FoodCard
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            onPress={() => handleFoodPress(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  list: {
    padding: Spacing.screenPadding,
  },

  separator: {
    height: Spacing.md,
  },
});
