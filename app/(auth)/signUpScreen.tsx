import { ButtonDefault } from "@/src/components/buttonDefault";
import { ContainerView } from "@/src/components/containerView";
import { InputDefault } from "@/src/components/inputDefault";
import { ThemedText } from "@/src/components/themed-text";
import { useThemeColor } from "@/src/hooks/use-theme-color";
import { useTranslation } from "@/src/hooks/use-translation";
import { scale, verticalScale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { translateText } = useTranslation();

  const accountText = translateText.auth.createAccount;

  const iconsColor = useThemeColor(
    { light: undefined, dark: undefined },
    "textSecondary",
  );

  return (
    <ContainerView headerHasPrincipalIcon headerLeftIcon="arrow-back">
      <View style={styles.titleContainer}>
        <ThemedText type="title">{accountText.title}</ThemedText>
      </View>
      <View style={styles.inputsContainer}>
        <InputDefault
          title={accountText.userNameLabel}
          value={name}
          onChangeText={setName}
          placeholder={accountText.userNamePlaceholder}
          leftIcon={
            <Ionicons name="person" size={scale(20)} color={iconsColor} />
          }
        />
        <InputDefault
          title={accountText.emailLabel}
          value={email}
          onChangeText={setEmail}
          placeholder={accountText.emailPlaceholder}
          leftIcon={
            <Ionicons name="mail" size={scale(20)} color={iconsColor} />
          }
        />
        <InputDefault
          title={accountText.passwordLabel}
          value={password}
          onChangeText={setPassword}
          placeholder={accountText.passwordPlaceholder}
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
        <InputDefault
          title={accountText.confirmPasswordLabel}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={accountText.confirmPasswordPlaceholder}
          secureTextEntry={true}
          leftIcon={
            <Ionicons name="lock-closed" size={scale(20)} color={iconsColor} />
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* TO DO: Add Sign up logic, validate fields, create account, navigate to login screen */}
        <ButtonDefault text={accountText.signUpButton} onPress={() => {}} />
      </View>
    </ContainerView>
  );
}

export const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: verticalScale(32),
  },
  inputsContainer: {
    gap: verticalScale(16),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // width: "100%",
    paddingBottom: verticalScale(20),
  },
});
