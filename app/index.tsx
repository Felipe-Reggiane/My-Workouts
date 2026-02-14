import { Redirect } from "expo-router";
import { useAuthStore } from "@stores/auth/auth.store";

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  // TODO: Create routes (auth)/login when have login implemented
  return <Redirect href="/(tabs)" />;
}
