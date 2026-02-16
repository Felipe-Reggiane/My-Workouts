import { scale, verticalScale } from "@src/utils/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: scale(4),
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(42),
    borderRadius: scale(4),
    paddingHorizontal: scale(8),
  },
  inputDefaultStyle: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
  },
  leftIconContainer: {
    marginRight: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonContainer: {
    marginLeft: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
});
