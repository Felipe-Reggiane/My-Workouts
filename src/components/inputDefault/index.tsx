import type { ReactNode } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";

import { useThemeColor } from "@/src/hooks/use-theme-color";
import { ThemedText } from "../themed-text";
import { styles } from "./styles";

export type InputDefaultProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  title?: string;
  leftIcon?: ReactNode;
  rightButton?: ReactNode;
  onRightButtonPress?: () => void;
};

export function InputDefault({
  style,
  lightColor,
  darkColor,
  value,
  onChangeText,
  title,
  leftIcon,
  rightButton,
  onRightButtonPress,
  ...otherProps
}: InputDefaultProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "backgroundSecondary",
  );

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textSecondary",
  );

  return (
    <View style={styles.container}>
      {title && <ThemedText type="default">{title}</ThemedText>}
      <View style={[{ backgroundColor }, styles.inputContainer]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[{ color }, style, styles.inputDefaultStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={color}
          {...otherProps}
        />
        {rightButton && (
          <TouchableOpacity
            style={styles.rightButtonContainer}
            onPress={onRightButtonPress}
            activeOpacity={0.7}
          >
            {rightButton}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
