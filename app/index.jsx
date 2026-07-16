import { Redirect } from "expo-router";

import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading message="Loading application..." />;
  }

  return <Redirect href="/(tabs)" />;
}
