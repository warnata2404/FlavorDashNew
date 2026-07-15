import { useEffect, useState } from "react";

import { getFoodById } from "../services/foodService";

export default function useFoodDetail(foodId) {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadFood() {
      try {
        setLoading(true);
        setError("");

        const data = await getFoodById(foodId);

        if (isMounted) {
          setFood(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load food.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (foodId) {
      loadFood();
    } else {
      setLoading(false);
      setError("Food ID is required.");
    }

    return () => {
      isMounted = false;
    };
  }, [foodId]);

  return {
    food,
    loading,
    error,
  };
}
