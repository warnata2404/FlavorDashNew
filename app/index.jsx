import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import useFoods from "../hooks/useFoods";
import { Colors, Spacing } from "../styles";

export default function HomeScreen() {
  const { foods, loading } = useFoods();
  const { authenticated, signOut } = useAuth();

  function handleFoodPress(food) {
    router.push({
      pathname: "/(protected)/order-detail",
      params: {
        foodId: food.id.toString(),
      },
    });
  }

  function handleLoginPress() {
    router.push("/(auth)/login");
  }

  async function handleLogoutPress() {
    await signOut();

    router.replace("/");
  }

  function handleCameraPress() {
    router.push("/(protected)/camera");
  }

  function handleMapPress() {
    router.push("/(protected)/map");
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

      <View style={styles.headerAction}>
        {authenticated ? (
          <>
            <AppButton title="Camera" onPress={handleCameraPress} />

            <View style={styles.buttonGap} />

            <AppButton title="Map" onPress={handleMapPress} />

            <View style={styles.buttonGap} />

            <AppButton title="Logout" onPress={handleLogoutPress} />
          </>
        ) : (
          <AppButton title="Login" onPress={handleLoginPress} />
        )}
      </View>

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

  headerAction: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.md,
  },

  buttonGap: {
    height: Spacing.sm,
  },

  list: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.screenPadding,
  },

  separator: {
    height: Spacing.md,
  },
});
