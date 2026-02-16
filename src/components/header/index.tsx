import { Images } from "@/assets/images";
import { useThemeColor } from "@/src/hooks/use-theme-color";
import { useTranslation } from "@/src/hooks/use-translation";
import { scale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { styles } from "./styles";

export type HeaderProps = {
  leftIcon?: "barbell" | "arrow-back";
  title?: string;
  headerHasPrincipalIcon?: boolean;
};

export function Header({
  leftIcon,
  title,
  headerHasPrincipalIcon,
}: HeaderProps) {
  const router = useRouter();

  const { currentLanguage, toggleLanguage } = useTranslation();

  const iconsColor = useThemeColor(
    { light: undefined, dark: undefined },
    "text",
  );

  const { Br, Us } = Images.flags;

  const onGoBackPress = () => {
    if (leftIcon === "arrow-back") {
      router.back();
      return;
    }
    return;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftIcon && (
          <TouchableOpacity onPress={onGoBackPress} activeOpacity={0.7}>
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
