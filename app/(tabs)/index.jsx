import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppHeader from "../../components/AppHeader";
import CategoryChips from "../../components/CategoryChips";
import EmptyState from "../../components/EmptyState";
import FoodCard from "../../components/FoodCard";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import APP_CONFIG from "../../config/app";
import { useAuth } from "../../context/AuthContext";
import useFoods from "../../hooks/useFoods";
import Routes from "../../navigation/routes";
import { Spacing } from "../../styles";

export default function HomeScreen() {
  const { foods, loading } = useFoods();
  const { authenticated, signOut } = useAuth();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleFoodPress(food) {
    router.push({
      pathname: Routes.ORDER_DETAIL,
      params: {
        foodId: food.id.toString(),
      },
    });
  }

  function handleLoginPress() {
    router.push(Routes.LOGIN);
  }

  async function handleLogoutPress() {
    await signOut();
    router.replace(Routes.LOGIN);
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

  const categories = ["All", ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const keyword = searchKeyword.trim().toLowerCase();

    const matchKeyword =
      keyword === "" ||
      food.name.toLowerCase().includes(keyword) ||
      food.category.toLowerCase().includes(keyword);

    const matchCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    return matchKeyword && matchCategory;
  });

  return (
    <FlatList
      data={filteredFoods}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.foodCardWrapper}>
          <FoodCard
            name={item.name}
            category={item.category}
            price={item.price}
            image={item.image}
            onPress={() => handleFoodPress(item)}
          />
        </View>
      )}
      ListHeaderComponent={
        <>
          <AppHeader
            title={APP_CONFIG.NAME}
            subtitle={APP_CONFIG.SUBTITLE}
            authenticated={authenticated}
            onActionPress={authenticated ? handleLogoutPress : handleLoginPress}
          />

          <View style={styles.searchContainer}>
            <SearchBar
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              onClear={() => setSearchKeyword("")}
            />
          </View>

          <SectionHeader
            title="Categories"
            subtitle="Browse foods by category"
          />

          <CategoryChips
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <SectionHeader
            title="Popular Foods"
            subtitle="Choose your favorite meals"
            rightText={`${filteredFoods.length} Items`}
          />
        </>
      }
      ListEmptyComponent={
        <EmptyState
          title="No Matching Foods"
          message="Try another keyword or category."
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.xxl,
  },

  searchContainer: {
    paddingHorizontal: Spacing.screenPadding,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  foodCardWrapper: {
    paddingHorizontal: Spacing.screenPadding,
  },

  separator: {
    height: Spacing.lg,
  },
});
