import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loading from "../components/Loading";
import APP_CONFIG from "../config/app";
import { useAuth } from "../context/AuthContext";
import useFoods from "../hooks/useFoods";
import Routes from "../navigation/routes";
import { Colors, Spacing } from "../styles";

export default function HomeScreen() {
  const { foods, loading } = useFoods();
  const { authenticated, signOut } = useAuth();

  const [searchKeyword, setSearchKeyword] = useState("");

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

    router.replace(Routes.HOME);
  }

  function handleCameraPress() {
    router.push(Routes.CAMERA);
  }

  function handleMapPress() {
    router.push(Routes.MAP);
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
      <AppHeader title={APP_CONFIG.NAME} subtitle={APP_CONFIG.SUBTITLE} />

      <View style={styles.headerAction}>
        {authenticated ? (
          <>
            <View style={styles.buttonRow}>
              <View style={styles.buttonItem}>
                <AppButton title="Camera" onPress={handleCameraPress} />
              </View>

              <View style={styles.buttonSpacer} />

              <View style={styles.buttonItem}>
                <AppButton title="Map" onPress={handleMapPress} />
              </View>
            </View>

            <View style={styles.logoutContainer}>
              <AppButton title="Logout" onPress={handleLogoutPress} />
            </View>
          </>
        ) : (
          <AppButton title="Login" onPress={handleLoginPress} />
        )}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search foods..."
          placeholderTextColor={Colors.textSecondary}
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>🍔 Today's Special</Text>

        <Text style={styles.bannerSubtitle}>
          Discover delicious meals prepared especially for you.
        </Text>
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
    paddingVertical: Spacing.lg,
  },

  buttonRow: {
    flexDirection: "row",
  },

  buttonItem: {
    flex: 1,
  },

  buttonSpacer: {
    width: Spacing.md,
  },

  logoutContainer: {
    marginTop: Spacing.md,
  },

  searchContainer: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.lg,
  },

  searchInput: {
    backgroundColor: Colors.white,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Spacing.inputRadius,

    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,

    color: Colors.text,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },

  banner: {
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.xl,

    backgroundColor: Colors.primary,

    borderRadius: Spacing.borderRadius,

    padding: Spacing.xl,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.white,
  },

  bannerSubtitle: {
    marginTop: Spacing.sm,

    color: Colors.white,

    fontSize: 14,

    lineHeight: 22,
  },

  list: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },

  separator: {
    height: Spacing.lg,
  },
});
