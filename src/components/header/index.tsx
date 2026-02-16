import { Images } from "@/assets/images";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTranslation } from "@/src/hooks/use-translation";
import { scale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { styles } from "./styles";

export type HeaderProps = {
  leftIcon?: "barbell" | "arrow-back";
  onLeftPress?: () => void;
  title?: string;
  headerHasPrincipalIcon?: boolean;
};

export function Header({
  leftIcon,
  onLeftPress,
  title,
  headerHasPrincipalIcon,
}: HeaderProps) {
  const { currentLanguage, toggleLanguage } = useTranslation();

  const iconsColor = useThemeColor(
    { light: undefined, dark: undefined },
    "text",
  );

  const { Br, Us } = Images.flags;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} activeOpacity={0.7}>
            <Ionicons name={leftIcon} size={scale(24)} color={iconsColor} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerContainer}>
        {headerHasPrincipalIcon && (
          <Ionicons name="barbell" size={scale(40)} color={iconsColor} />
        )}
        {!headerHasPrincipalIcon && title && (
          <ThemedText type="subtitle">{title}</ThemedText>
        )}
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={toggleLanguage} activeOpacity={0.7}>
          {currentLanguage === "en" ? (
            <Us width={scale(24)} height={scale(24)} />
          ) : (
            <Br width={scale(24)} height={scale(24)} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
