import { Redirect, Slot } from "expo-router";

import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedLayout() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!authenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
