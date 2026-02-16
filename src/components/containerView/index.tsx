import { type ViewProps, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "@/src/hooks/use-theme-color";
import { Header } from "../header";
import { styles } from "./styles";

export type ContainerViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  headerLeftIcon?: "barbell" | "arrow-back";
  headerHasPrincipalIcon?: boolean;
  headerTitle?: string;
};

export function ContainerView({
  style,
  lightColor,
  darkColor,
  headerLeftIcon,
  headerTitle,
  headerHasPrincipalIcon,
  ...otherProps
}: ContainerViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const showHeader = headerLeftIcon || headerTitle || headerHasPrincipalIcon;

  return (
    <SafeAreaView style={[{ backgroundColor, flex: 1 }, styles.container]}>
      {showHeader && (
        <Header
          leftIcon={headerLeftIcon}
          title={headerTitle}
          headerHasPrincipalIcon={headerHasPrincipalIcon}
        />
      )}
      <View style={[styles.content, style]} {...otherProps}>
        {otherProps.children}
      </View>
    </SafeAreaView>
  );
}
