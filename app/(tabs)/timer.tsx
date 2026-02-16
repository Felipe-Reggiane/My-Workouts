import { BaseColors } from "@/constants/theme";
import { ButtonDefault } from "@/src/components/buttonDefault";
import { ContainerView } from "@/src/components/containerView";
import { ThemedText } from "@/src/components/themed-text";
import "@/src/config/notifications.config";
import { useThemeColor } from "@/src/hooks/use-theme-color";
import { useTimer } from "@/src/hooks/use-timer";
import { useTranslation } from "@/src/hooks/use-translation";
import { scale, verticalScale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Timer() {
  const [editingMinutes, setEditingMinutes] = useState("");
  const [editingSeconds, setEditingSeconds] = useState("");
  const [isFocusedMinutes, setIsFocusedMinutes] = useState(false);
  const [isFocusedSeconds, setIsFocusedSeconds] = useState(false);

  const { translateText } = useTranslation();

  const {
    totalSeconds,
    minutes,
    seconds,
    isRunning,
    setTotalSeconds,
    handleIncrement,
    handleDecrement,
    handleStartPause,
    handleReset,
  } = useTimer();

  const textColor = useThemeColor(
    { light: undefined, dark: undefined },
    "text",
  );

  const iconColor = useThemeColor(
    { light: undefined, dark: undefined },
    "textSecondary",
  );

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const handleMinutesFocus = () => {
    setIsFocusedMinutes(true);
    setEditingMinutes(minutes === 0 ? "" : minutes.toString());
  };

  const handleMinutesBlur = () => {
    setIsFocusedMinutes(false);
    const num = parseInt(editingMinutes) || 0;
    const newMinutes = Math.min(num, 99);
    setTotalSeconds(newMinutes * 60 + seconds);
    setEditingMinutes("");
  };

  const handleSecondsFocus = () => {
    setIsFocusedSeconds(true);
    setEditingSeconds(seconds === 0 ? "" : seconds.toString());
  };

  const handleSecondsBlur = () => {
    setIsFocusedSeconds(false);
    const num = parseInt(editingSeconds) || 0;
    const newSeconds = Math.min(num, 59);
    setTotalSeconds(minutes * 60 + newSeconds);
    setEditingSeconds("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContainerView
        headerLeftIcon="arrow-back"
        style={styles.container}
        headerHasPrincipalIcon
      >
        <View style={styles.content}>
          <View style={styles.timerCircle}>
            <View style={styles.timeContainer}>
              {/* Minutes */}
              <View style={styles.timeSection}>
                <TouchableOpacity
                  onPress={() => handleIncrement("minutes")}
                  disabled={isRunning}
                  style={styles.arrowButton}
                >
                  <Ionicons
                    name="chevron-up"
                    size={scale(32)}
                    color={isRunning ? iconColor : iconColor}
                  />
                </TouchableOpacity>

                <TextInput
                  value={
                    isFocusedMinutes ? editingMinutes : formatNumber(minutes)
                  }
                  onChangeText={setEditingMinutes}
                  onFocus={handleMinutesFocus}
                  onBlur={handleMinutesBlur}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={[styles.timeInput, { color: textColor }]}
                  editable={!isRunning}
                  selectTextOnFocus
                />

                <TouchableOpacity
                  onPress={() => handleDecrement("minutes")}
                  disabled={isRunning}
                  style={styles.arrowButton}
                >
                  <Ionicons
                    name="chevron-down"
                    size={scale(32)}
                    color={isRunning ? iconColor : iconColor}
                  />
                </TouchableOpacity>
              </View>

              <ThemedText style={styles.separator}>:</ThemedText>

              <View style={styles.timeSection}>
                <TouchableOpacity
                  onPress={() => handleIncrement("seconds")}
                  disabled={isRunning}
                  style={styles.arrowButton}
                >
                  <Ionicons
                    name="chevron-up"
                    size={scale(32)}
                    color={isRunning ? iconColor : iconColor}
                  />
                </TouchableOpacity>

                <TextInput
                  value={
                    isFocusedSeconds ? editingSeconds : formatNumber(seconds)
                  }
                  onChangeText={setEditingSeconds}
                  onFocus={handleSecondsFocus}
                  onBlur={handleSecondsBlur}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={[styles.timeInput, { color: textColor }]}
                  editable={!isRunning}
                  selectTextOnFocus
                />

                <TouchableOpacity
                  onPress={() => handleDecrement("seconds")}
                  disabled={isRunning}
                  style={styles.arrowButton}
                >
                  <Ionicons
                    name="chevron-down"
                    size={scale(32)}
                    color={isRunning ? iconColor : iconColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonDefault
              text={
                isRunning ? translateText.timer.pause : translateText.timer.init
              }
              onPress={handleStartPause}
              style={styles.button}
              disabled={totalSeconds === 0}
            />

            {totalSeconds > 0 && (
              <ButtonDefault
                text={translateText.timer.reset}
                onPress={handleReset}
                variant="secondary"
                style={styles.button}
              />
            )}
          </View>
        </View>
      </ContainerView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: verticalScale(60),
  },
  timerCircle: {
    width: scale(280),
    height: scale(280),
    borderRadius: scale(140),
    borderWidth: scale(8),
    borderColor: BaseColors.primary.main,
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  timeSection: {
    alignItems: "center",
    gap: verticalScale(8),
  },
  arrowButton: {
    padding: scale(8),
  },
  timeInput: {
    fontSize: scale(64),
    fontWeight: "bold",
    textAlign: "center",
    minWidth: scale(80),
  },
  separator: {
    fontSize: scale(64),
    lineHeight: scale(64),
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    gap: verticalScale(12),
    paddingHorizontal: scale(20),
  },
  button: {
    width: "100%",
  },
});
