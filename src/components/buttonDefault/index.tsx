import { IconsType, Images } from "@/assets/images";
import { BaseColors } from "@/constants/theme";
import { useThemeColor } from "@/src/hooks/use-theme-color";
import { scale } from "@/src/utils/scale";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { ThemedText } from "../themed-text";
import { styles } from "./styles";

export type ButtonDefaultProps = TouchableOpacityProps & {
  text: string | React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  gradientColors?: [string, string];
  iconName?: IconsType;
};

export function ButtonDefault({
  style,
  text,
  onPress,
  variant = "primary",
  gradientColors,
  iconName,
  ...otherProps
}: ButtonDefaultProps) {
  const defaultGradientColors: [string, string] = [
    BaseColors.primary.ligth,
    BaseColors.primary.main,
  ];

  const iconSize = scale(24);

  const renderContent = () => {
    return typeof text === "string" ? (
      <ThemedText type="button">{text}</ThemedText>
    ) : (
      text
    );
  };

  const renderIconContent = () => {
    const Icon = iconName && Images.icons[iconName];
    return (
      <View style={styles.iconRow}>
        {Icon && <Icon width={iconSize} height={iconSize} />}
        {renderContent()}
      </View>
    );
  };

  const tertiaryBackgroundColor = useThemeColor(
    { light: undefined, dark: undefined },
    "background",
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        variant === "secondary" && styles.secondary,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      {...otherProps}
    >
      {variant === "primary" && (
        <LinearGradient
          colors={gradientColors || defaultGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {iconName ? renderIconContent() : renderContent()}
        </LinearGradient>
      )}
      {variant === "secondary" &&
        (iconName ? renderIconContent() : renderContent())}
      {variant === "tertiary" && (
        <LinearGradient
          colors={gradientColors || defaultGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View
            style={[
              styles.tertiaryInner,
              { backgroundColor: tertiaryBackgroundColor },
            ]}
          >
            {iconName ? renderIconContent() : renderContent()}
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}
