/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const BaseColors = {
  white: "#FFFFFF",
  black: "#0E1216",

  gray: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },

  primary: {
    main: "#F06500",
    ligth: "#FFA05C",
    inactive: "#BD7744",
  },

  background: {
    black1: "#353A40",
    black2: "#121416",
    white: "#FFFFFF",
  },
};

const tintColorLight = BaseColors.primary.main;
const tintColorDark = BaseColors.primary.main;

export const Colors = {
  light: {
    text: BaseColors.gray[900],
    textSecondary: BaseColors.gray[600],
    background: BaseColors.white,
    backgroundSecondary: BaseColors.gray[50],
    tint: tintColorLight,
    icon: BaseColors.gray[600],
    tabIconDefault: BaseColors.gray[500],
    tabIconSelected: tintColorLight,
    border: BaseColors.gray[500],
    card: BaseColors.white,
    primary: BaseColors.primary.main,
    primaryLight: BaseColors.primary.inactive,
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },
  dark: {
    text: BaseColors.white,
    textSecondary: BaseColors.gray[300],
    background: BaseColors.gray[900],
    backgroundSecondary: BaseColors.gray[700],
    tint: tintColorDark,
    icon: BaseColors.gray[300],
    tabIconDefault: BaseColors.gray[400],
    tabIconSelected: tintColorDark,
    border: BaseColors.gray[700],
    card: BaseColors.gray[800],
    primary: BaseColors.primary.main,
    primaryLight: BaseColors.primary.ligth,
    error: "#F87171",
    success: "#34D399",
    warning: "#FBBF24",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
