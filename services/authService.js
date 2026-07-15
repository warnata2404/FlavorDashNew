import * as SecureStore from "expo-secure-store";

import { AUTH } from "../constants/auth";

export async function login(username, password) {
  if (username !== AUTH.USERNAME || password !== AUTH.PASSWORD) {
    throw new Error("Invalid username or password.");
  }

  const token = "mock-jwt-token";

  await SecureStore.setItemAsync(AUTH.TOKEN_KEY, token);

  return token;
}

export async function logout() {
  await SecureStore.deleteItemAsync(AUTH.TOKEN_KEY);
}

export async function getToken() {
  return SecureStore.getItemAsync(AUTH.TOKEN_KEY);
}

export async function isAuthenticated() {
  const token = await getToken();

  return token !== null;
}
