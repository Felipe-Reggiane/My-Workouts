import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Base dimensions (iPhone 11/XR - 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scale = (size: number): number => {
  return (width / BASE_WIDTH) * size;
};

export const verticalScale = (size: number): number => {
  return (height / BASE_HEIGHT) * size;
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

export const scaleHorizontal = scale;

export const scaleVertical = verticalScale;
