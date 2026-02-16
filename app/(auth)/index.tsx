import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Images } from "@/assets/images";
import { BaseColors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ButtonDefault } from "@/src/components/buttonDefault";
import { ContainerView } from "@/src/components/containerView";
import { InputDefault } from "@/src/components/inputDefault";
import { ThemedText } from "@/src/components/themed-text";
import { squareBracketPattern } from "@/src/utils/format";
import { scale, verticalScale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const iconsColor = useThemeColor(
    { light: undefined, dark: undefined },
    "textSecondary",
  );

  const { Google } = Images.icons;
  return (
    <ContainerView style={styles.container}>
      <Ionicons
        name={"barbell"}
        size={scale(40)}
        color={iconsColor}
        style={styles.principalIcon}
      />
      <ThemedText type="title" style={styles.title}>
        Login to your Account
      </ThemedText>
      <View style={styles.inputsContainer}>
        <InputDefault
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter you email address"
          leftIcon={
            <Ionicons name="mail" size={scale(20)} color={iconsColor} />
          }
        />
        <InputDefault
          title="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
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
        Forgot password?
      </ThemedText>
      <View style={styles.buttonsContainer}>
        <ButtonDefault
          text="Login"
          onPress={() => {}}
          style={styles.loginButton}
        />
        {/* TO DO: Add Sign up logic, navigate to sign up screen */}
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
              Don`t have an account? [Sign up]
            </ThemedText>
          }
          onPress={() => {}}
          style={styles.signUpButton}
        />
        <ThemedText type="default" style={styles.alternativeLoginText}>
          Alternative Login with:
        </ThemedText>
        {/* TO DO: Add login with google logic, integrate with firebase */}
        <ButtonDefault
          text="GOOGLE"
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
  principalIcon: {
    marginTop: verticalScale(44),
    marginBottom: verticalScale(32),
  },
  title: {
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
  },
  buttonsContainer: {
    flex: 1,
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
