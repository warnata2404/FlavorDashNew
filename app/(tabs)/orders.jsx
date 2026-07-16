import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import SectionHeader from "../../components/SectionHeader";
import { ORDER } from "../../constants/order";
import useOrder from "../../hooks/useOrder";
import Routes from "../../navigation/routes";
import { Colors, Spacing, Typography } from "../../styles";
import { formatCurrency } from "../../utils/currency";
import { formatDateTime } from "../../utils/date";

export default function OrdersScreen() {
  const { getOrders, clearOrders } = useOrder();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, []),
  );

  async function loadOrders() {
    setLoading(true);

    const data = await getOrders();

    data.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    );

    setOrders(data);

    setLoading(false);
  }

  function openOrder(order) {
    router.push({
      pathname: Routes.ORDER_DETAIL,
      params: {
        foodId: order.food.id.toString(),
      },
    });
  }

  function handleClearHistory() {
    Alert.alert(
      "Clear Order History",
      "Are you sure you want to delete all order history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearOrders();
            loadOrders();
          },
        },
      ],
    );
  }

  function getStatusLabel(status) {
    switch (status) {
      case ORDER.STATUS_SUCCESS:
        return "✔ Success";

      case ORDER.STATUS_PREPARING:
        return "🍳 Preparing";

      default:
        return status;
    }
  }

  if (loading) {
    return <Loading message="Loading orders..." />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Yet"
        message="Your food orders will appear here after placing your first order."
      />
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <SectionHeader
            title="🧾 Order History"
            subtitle="Review all of your previous food orders"
            rightText={`${orders.length} Order${orders.length > 1 ? "s" : ""}`}
          />

          <Pressable
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.pressed,
            ]}
            onPress={handleClearHistory}
          >
            <Text style={styles.clearText}>Clear History</Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() => openOrder(item)}
        >
          <Image
            source={{ uri: item.food.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.contentArea}>
            <View style={styles.topRow}>
              <Text numberOfLines={1} style={styles.name}>
                {item.food.name}
              </Text>

              <Text style={styles.arrow}>›</Text>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.food.category}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.date}>
                🕒 {formatDateTime(item.orderDate)}
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.price}>
                💰 {formatCurrency(item.food.price)}
              </Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {getStatusLabel(item.status)}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },

  headerContainer: {
    marginBottom: Spacing.xl,
  },

  clearButton: {
    alignSelf: "flex-end",

    marginTop: Spacing.sm,

    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,

    borderRadius: 999,

    backgroundColor: Colors.dangerLight,

    borderWidth: 1,
    borderColor: Colors.danger,
  },

  clearText: {
    ...Typography.bodySmall,

    color: Colors.danger,

    fontWeight: "700",
  },

  separator: {
    height: Spacing.lg,
  },

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: 20,

    padding: Spacing.md,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  pressed: {
    opacity: 0.85,
  },

  image: {
    width: 96,
    height: 96,

    borderRadius: 16,

    backgroundColor: Colors.surface,

    marginRight: Spacing.md,
  },

  contentArea: {
    flex: 1,

    justifyContent: "space-between",

    minHeight: 96,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  name: {
    flex: 1,

    ...Typography.title,

    color: Colors.text,

    marginRight: Spacing.sm,
  },

  arrow: {
    fontSize: 22,

    color: Colors.textSecondary,

    fontWeight: "700",
  },

  categoryBadge: {
    alignSelf: "flex-start",

    marginTop: Spacing.sm,

    paddingHorizontal: Spacing.md,
    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: Colors.surface,
  },

  categoryText: {
    ...Typography.caption,

    color: Colors.primary,

    fontWeight: "700",
  },

  infoRow: {
    marginTop: Spacing.sm,
  },

  date: {
    ...Typography.bodySmall,

    color: Colors.textSecondary,
  },

  footer: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: Spacing.md,
  },

  price: {
    ...Typography.title,

    color: Colors.primary,

    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,

    backgroundColor: Colors.success,
  },

  statusText: {
    ...Typography.caption,

    color: Colors.white,

    fontWeight: "700",
  },
});
