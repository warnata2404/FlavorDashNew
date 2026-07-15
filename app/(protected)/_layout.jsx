import { Redirect, Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import Routes from "../../navigation/routes";
import { Colors } from "../../styles";

export default function ProtectedLayout() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading message="Preparing your workspace..." />
      </View>
    );
  }

  if (!authenticated) {
    return <Redirect href={Routes.LOGIN} />;
  }

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
