import { scale, verticalScale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: scale(8),
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBorder: {
    padding: scale(2),
    borderRadius: scale(8),
  },
  secondary: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  tertiaryInner: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    borderRadius: scale(6),
    alignItems: "center",
    justifyContent: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
});
