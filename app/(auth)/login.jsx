import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
import Routes from "../../navigation/routes";
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

      Alert.alert("Berhasil", "Login berhasil.", [
        {
          text: "OK",
          onPress: () => {
            router.replace(Routes.HOME);
          },
        },
      ]);
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
      <View style={styles.card}>
        <Text style={styles.logo}>🍔</Text>

        <Text style={styles.title}>FlavorDash</Text>

        <Text style={styles.subtitle}>Welcome back! Sign in to continue.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor={Colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          <AppButton
            title={loading ? "Signing In..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        <Text style={styles.demo}>
          Demo Account{"\n"}
          Username : admin{"\n"}
          Password : admin123
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: Colors.background,

    padding: Spacing.screenPadding,
  },

  card: {
    backgroundColor: Colors.white,

    borderRadius: Spacing.borderRadius,

    padding: Spacing.xl,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  logo: {
    fontSize: 56,

    textAlign: "center",
  },

  title: {
    ...Typography.heading2,

    textAlign: "center",

    color: Colors.text,

    marginTop: Spacing.md,
  },

  subtitle: {
    ...Typography.body,

    color: Colors.textSecondary,

    textAlign: "center",

    marginTop: Spacing.sm,
  },

  form: {
    marginTop: Spacing.xl,
  },

  label: {
    ...Typography.bodySmall,

    color: Colors.text,

    fontWeight: "600",

    marginBottom: Spacing.sm,
  },

  input: {
    backgroundColor: Colors.white,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Spacing.inputRadius,

    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,

    marginBottom: Spacing.lg,

    color: Colors.text,

    ...Typography.body,
  },

  demo: {
    ...Typography.caption,

    color: Colors.textSecondary,

    textAlign: "center",

    marginTop: Spacing.xl,

    lineHeight: 20,
  },
});
