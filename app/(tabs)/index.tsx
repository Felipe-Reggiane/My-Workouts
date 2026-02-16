import { StyleSheet } from "react-native";

import { ContainerView } from "@/src/components/containerView";
import { ThemedText } from "@src/components/themed-text";

export default function HomeScreen() {
  return (
    <ContainerView headerLeftIcon="barbell">
      <ThemedText>teste</ThemedText>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
