import { StyleSheet, Text, View } from "react-native";

export default function OrderDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
});
