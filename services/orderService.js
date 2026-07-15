import { ORDER } from "../constants/order";

const orders = [];

export async function createOrder(food) {
  const order = {
    id: Date.now(),
    food,
    orderDate: new Date().toISOString(),
    status: ORDER.STATUS_SUCCESS,
  };

  orders.push(order);

  return order;
}

export async function getOrders() {
  return [...orders];
}

export async function getOrderById(orderId) {
  return orders.find((order) => order.id === Number(orderId)) ?? null;
}

export async function hasOrderedFood(foodId) {
  return orders.some((order) => order.food.id === Number(foodId));
}

export async function clearOrders() {
  orders.length = 0;
}
