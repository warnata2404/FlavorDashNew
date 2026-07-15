import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
import { Colors, Spacing, Typography } from "../../styles";

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Validation", "Username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await signIn(username.trim(), password);

      Alert.alert(
        "Berhasil",
        "Login berhasil. Route Protection akan diimplementasikan pada PHASE 07.",
      );
    } catch (error) {
      Alert.alert(
        "Login Gagal",
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title={loading ? "Loading..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.screenPadding,
    backgroundColor: Colors.background,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.borderRadius,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    color: Colors.text,
    ...Typography.body,
  },
});
