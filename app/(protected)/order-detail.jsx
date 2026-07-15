import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Image
        source={{ uri: food.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{food.name}</Text>

        <Text style={styles.category}>{food.category}</Text>

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

  buttonContainer: {
    marginTop: Spacing.xl,
  },
});
