import { useEffect, useState } from "react";

import { getFoods } from "../services/foodService";

export default function useFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFoods() {
      try {
        const data = await getFoods();
        setFoods(data);
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  return {
    foods,
    loading,
  };
}
