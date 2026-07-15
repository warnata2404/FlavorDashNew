import { useState } from "react";

import {
  clearOrders,
  createOrder,
  getOrderById,
  getOrders,
  hasOrderedFood,
} from "../services/orderService";

export default function useOrder() {
  const [loading, setLoading] = useState(false);

  async function order(food) {
    try {
      setLoading(true);

      return await createOrder(food);
    } finally {
      setLoading(false);
    }
  }

  return {
    order,
    loading,
    getOrders,
    getOrderById,
    hasOrderedFood,
    clearOrders,
  };
}
