import { type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";
import { styles } from "./styles";

export type ContainerViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ContainerView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ContainerViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <SafeAreaView
      style={[{ backgroundColor, flex: 1 }, style, styles.container]}
      {...otherProps}
    />
  );
}
