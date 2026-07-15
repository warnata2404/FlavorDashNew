import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import { ORDER } from "../../constants/order";
import useFoodDetail from "../../hooks/useFoodDetail";
import useOrder from "../../hooks/useOrder";
import Routes from "../../navigation/routes";
import { Colors, Spacing, Typography } from "../../styles";
import { formatCurrency } from "../../utils/currency";

export default function OrderDetailScreen() {
  const { foodId } = useLocalSearchParams();

  const { food, loading, error } = useFoodDetail(foodId);

  const { order, loading: ordering, hasOrderedFood } = useOrder();

  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkOrderStatus() {
      if (!food) {
        return;
      }

      const exists = await hasOrderedFood(food.id);

      if (isMounted) {
        setOrdered(exists);
      }
    }

    checkOrderStatus();

    return () => {
      isMounted = false;
    };
  }, [food, hasOrderedFood]);

  async function handleOrder() {
    try {
      const result = await order(food);

      setOrdered(true);

      router.replace({
        pathname: Routes.ORDER_CONFIRMATION,
        params: {
          orderId: result.id.toString(),
          foodName: food.name,
        },
      });
    } catch (err) {
      Alert.alert(
        ORDER.ALERT_FAILED,
        err instanceof Error ? err.message : "Failed to create order.",
      );
    }
  }

  if (loading) {
    return <Loading message="Loading food detail..." />;
  }

  if (error) {
    return <EmptyState title="Food Not Found" message={error} />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: food.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{food.category}</Text>
        </View>

        <Text style={styles.name}>{food.name}</Text>

        <Text style={styles.description}>
          Freshly prepared with quality ingredients, delicious flavor, and ready
          to satisfy your appetite.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.priceLabel}>Price</Text>

        <Text style={styles.price}>{formatCurrency(food.price)}</Text>

        <View style={styles.buttonContainer}>
          <AppButton
            title={
              ordered
                ? "Already Ordered"
                : ordering
                  ? "Ordering..."
                  : "Order Now"
            }
            onPress={handleOrder}
            disabled={ordering || ordered}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  image: {
    width: "100%",
    height: 280,

    backgroundColor: Colors.surface,
  },

  card: {
    backgroundColor: Colors.white,

    marginTop: -20,

    marginHorizontal: Spacing.screenPadding,

    borderRadius: Spacing.borderRadius,

    padding: Spacing.xl,

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

  badge: {
    alignSelf: "flex-start",

    backgroundColor: Colors.surface,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,

    borderRadius: 999,
  },

  badgeText: {
    ...Typography.caption,

    color: Colors.secondary,

    fontWeight: "600",
  },

  name: {
    ...Typography.heading2,

    color: Colors.text,

    marginTop: Spacing.lg,
  },

  description: {
    ...Typography.body,

    color: Colors.textSecondary,

    marginTop: Spacing.md,

    lineHeight: 24,
  },

  divider: {
    height: 1,

    backgroundColor: Colors.border,

    marginVertical: Spacing.xl,
  },

  priceLabel: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,
  },

  price: {
    ...Typography.heading2,

    color: Colors.primary,

    marginTop: Spacing.sm,
  },

  buttonContainer: {
    marginTop: Spacing.xl,
  },
});
