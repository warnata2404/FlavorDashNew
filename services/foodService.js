import foods from "../mock/foods";

export async function getFoods() {
  return foods;
}

export async function getFoodById(foodId) {
  const food = foods.find((item) => item.id === Number(foodId));

  if (!food) {
    throw new Error("Food not found.");
  }

  return food;
}
