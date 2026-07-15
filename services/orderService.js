export async function createOrder(food) {
  return {
    id: Date.now(),
    food,
    orderDate: new Date().toISOString(),
    status: "SUCCESS",
  };
}
