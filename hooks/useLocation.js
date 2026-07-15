import { useEffect, useState } from "react";

import {
  getCurrentLocation,
  requestLocationPermission,
} from "../services/locationService";

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    try {
      setLoading(true);
      setError("");

      const permission = await requestLocationPermission();

      if (!permission.granted) {
        setError("Location permission denied.");
        return;
      }

      const currentLocation = await getCurrentLocation();

      setLocation(currentLocation);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get current location.",
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    location,
    loading,
    error,
    refresh: loadLocation,
  };
}
