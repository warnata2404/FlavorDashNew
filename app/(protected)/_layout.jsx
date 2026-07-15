import { Redirect, Slot } from "expo-router";

import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import Routes from "../../navigation/routes";

export default function ProtectedLayout() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!authenticated) {
    return <Redirect href={Routes.LOGIN} />;
  }

  return <Slot />;
}
