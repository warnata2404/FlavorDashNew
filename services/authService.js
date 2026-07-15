import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export async function login(username, password) {
  if (username !== "admin" || password !== "admin123") {
    throw new Error("Invalid username or password.");
  }

  const token = `mock-jwt-token-${Date.now()}`;

  await SecureStore.setItemAsync(TOKEN_KEY, token);

  return token;
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function isAuthenticated() {
  const token = await getToken();

  return token !== null;
}
