import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
      if (!food) return;

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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: food.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{food.category}</Text>
          </View>

          <View style={styles.ratingBadge}>
            <Text style={styles.rating}>⭐ 4.8</Text>
          </View>
        </View>

        <Text style={styles.name}>{food.name}</Text>

        <Text style={styles.description}>
          Freshly prepared using premium ingredients with balanced seasoning and
          delicious taste, ready to satisfy your appetite.
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>💰</Text>

            <Text style={styles.infoLabel}>Price</Text>

            <Text style={styles.price}>{formatCurrency(food.price)}</Text>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⏱️</Text>

            <Text style={styles.infoLabel}>Estimated</Text>

            <Text style={styles.infoValue}>15–20 min</Text>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About this Menu</Text>

          <Text style={styles.sectionDescription}>
            This menu is prepared fresh every day using selected ingredients and
            is suitable for lunch, dinner, or sharing with friends and family.
          </Text>
        </View>

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

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 260,
    backgroundColor: Colors.surface,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  card: {
    marginTop: -22,
    marginHorizontal: Spacing.screenPadding,

    backgroundColor: Colors.white,

    borderRadius: 20,

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

    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    backgroundColor: Colors.surface,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  badgeText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
  },

  ratingBadge: {
    backgroundColor: "#FFF8E7",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  rating: {
    ...Typography.caption,
    color: Colors.warning,
    fontWeight: "700",
  },

  name: {
    ...Typography.heading2,
    color: Colors.text,
    marginTop: Spacing.lg,
  },

  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginTop: Spacing.md,
  },

  infoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: Spacing.xl,

    backgroundColor: Colors.surface,

    borderRadius: 16,

    padding: Spacing.lg,
  },

  infoItem: {
    flex: 1,
    alignItems: "center",
  },

  infoIcon: {
    fontSize: 20,
    marginBottom: 6,
  },

  infoDivider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.border,
  },

  infoLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  price: {
    ...Typography.heading3,
    color: Colors.primary,
    marginTop: 4,
  },

  infoValue: {
    ...Typography.title,
    color: Colors.text,
    marginTop: 4,
  },

  aboutSection: {
    marginTop: Spacing.xl,
  },

  sectionTitle: {
    ...Typography.title,
    color: Colors.text,
  },

  sectionDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: Spacing.sm,
  },

  buttonContainer: {
    marginTop: Spacing.xxl,
  },
});
