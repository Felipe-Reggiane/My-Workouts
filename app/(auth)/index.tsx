import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Images } from "@/assets/images";
import { BaseColors } from "@/constants/theme";
import { ButtonDefault } from "@/src/components/buttonDefault";
import { ContainerView } from "@/src/components/containerView";
import { InputDefault } from "@/src/components/inputDefault";
import { ThemedText } from "@/src/components/themed-text";
import { useThemeColor } from "@/src/hooks/use-theme-color";
import { useTranslation } from "@/src/hooks/use-translation";
import { squareBracketPattern } from "@/src/utils/format";
import { scale, verticalScale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const router = useRouter();
  const { translateText } = useTranslation();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const iconsColor = useThemeColor(
    { light: undefined, dark: undefined },
    "textSecondary",
  );

  const { Google } = Images.icons;
  return (
    <ContainerView style={styles.container} headerHasPrincipalIcon>
      <ThemedText type="title" style={styles.title}>
        {translateText.auth.login.title}
      </ThemedText>
      <View style={styles.inputsContainer}>
        <InputDefault
          title={translateText.auth.login.emailLabel}
          value={email}
          onChangeText={setEmail}
          placeholder={translateText.auth.login.emailPlaceholder}
          leftIcon={
            <Ionicons name="mail" size={scale(20)} color={iconsColor} />
          }
        />
        <InputDefault
          title={translateText.auth.login.passwordLabel}
          value={password}
          onChangeText={setPassword}
          placeholder={translateText.auth.login.passwordPlaceholder}
          leftIcon={
            <Ionicons name="lock-closed" size={scale(20)} color={iconsColor} />
          }
          rightButton={
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={scale(20)}
              color={iconsColor}
            />
          }
          onRightButtonPress={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
        />
      </View>
      {/* TO DO: Add forgot password logic, send email */}
      <ThemedText type="default" style={styles.forgotPasswordText}>
        {translateText.auth.login.forgotPassword}
      </ThemedText>
      <View style={styles.buttonsContainer}>
        <ButtonDefault
          text={translateText.auth.login.loginButton}
          onPress={() => {}}
          style={styles.loginButton}
        />
        {/* TO DO: Add Sign up logic */}
        <ButtonDefault
          variant="secondary"
          text={
            <ThemedText
              type="default"
              parsePattern={[
                {
                  ...squareBracketPattern,
                  style: styles.signUpText,
                },
              ]}
            >
              {translateText.auth.login.signUpText}
            </ThemedText>
          }
          onPress={() => router.push("/(auth)/signUpScreen")}
          style={styles.signUpButton}
        />
        <ThemedText type="default" style={styles.alternativeLoginText}>
          {translateText.auth.login.alternativeLogin}
        </ThemedText>
        {/* TO DO: Add login with google logic, integrate with firebase */}
        <ButtonDefault
          text={translateText.auth.login.googleButton}
          onPress={() => {}}
          variant="tertiary"
          iconName={"Google"}
        />
      </View>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginTop: verticalScale(20),
    marginBottom: scale(32),
  },
  inputsContainer: {
    marginBottom: scale(12),
    gap: scale(16),
    width: "100%",
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: verticalScale(60),
  },
  buttonsContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingBottom: verticalScale(20),
  },
  loginButton: {
    marginBottom: verticalScale(12),
  },
  signUpText: {
    color: BaseColors.primary.main,
  },
  signUpButton: {
    marginBottom: verticalScale(62),
  },
  alternativeLoginText: {
    marginBottom: verticalScale(16),
  },
});
