import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useTranslation } from "./use-translation";

export function useTimerNotifications() {
  const notificationIdRef = useRef<string | null>(null);

  const { translateText } = useTranslation();

  useEffect(() => {
    async function setupNotifications() {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("timer", {
          name: "Timer",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          sound: "default",
        });
      }

      // Request permissions on iOS
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
    }

    setupNotifications();
  }, []);

  // Cleanup: cancell notification when dismounting
  useEffect(() => {
    return () => {
      cancelNotification();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleNotification = async (secondsToWait: number) => {
    try {
      await cancelNotification();

      if (secondsToWait <= 0) {
        return;
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: translateText.notification.title,
          body: translateText.notification.body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.MAX,
          ...(Platform.OS === "android" && { channelId: "timer" }),
        },
        trigger: {
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsToWait,
        },
      });

      notificationIdRef.current = notificationId;
    } catch (error) {
      console.error("Erro agending notification:", error);
    }
  };

  const cancelNotification = async () => {
    try {
      if (notificationIdRef.current) {
        await Notifications.cancelScheduledNotificationAsync(
          notificationIdRef.current,
        );
        notificationIdRef.current = null;
      }
    } catch (error) {
      console.error("Error canceling notification :", error);
    }
  };

  return {
    scheduleNotification,
    cancelNotification,
    notificationIdRef,
  };
}
