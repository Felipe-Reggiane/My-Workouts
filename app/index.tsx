import { useAuthStore } from "@stores/auth/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated", isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)" />;
}
