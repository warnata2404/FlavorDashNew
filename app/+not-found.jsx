import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />

      <View style={styles.container}>
        <Text style={styles.title}>404</Text>

        <Text style={styles.description}>
          The page you are looking for does not exist.
        </Text>

        <Link href="/" style={styles.link}>
          Back to Home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666666",
    marginBottom: 24,
  },
  link: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },
});
