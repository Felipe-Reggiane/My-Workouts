import { ParsedText, ParseShape } from "parsed-text-rn";
import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/src/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "button";
  parsePattern?: ParseShape[];
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  parsePattern,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return parsePattern ? (
    <ParsedText
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "button" ? styles.button : undefined,
        style,
      ]}
      {...rest}
      parse={parsePattern}
    />
  ) : (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "button" ? styles.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
