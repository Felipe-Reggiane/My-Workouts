import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { useTimerNotifications } from "./use-timer-notifications";

export function useTimer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const initialSecondsRef = useRef<number>(0);
  const appState = useRef(AppState.currentState);

  const { scheduleNotification, cancelNotification, notificationIdRef } =
    useTimerNotifications();

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setIsRunning(false);
        setTotalSeconds(0);
        startTimeRef.current = null;
        initialSecondsRef.current = 0;
      });

    return () => {
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isRunning && startTimeRef.current && initialSecondsRef.current > 0) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimeRef.current!) / 1000);
        const remainingSeconds = Math.max(
          0,
          initialSecondsRef.current - elapsedSeconds,
        );

        if (remainingSeconds === 0) {
          setIsRunning(false);
          setTotalSeconds(0);
          startTimeRef.current = null;
          initialSecondsRef.current = 0;
          notificationIdRef.current = null;
          cancelNotification();
        } else {
          setTotalSeconds(remainingSeconds);
        }
      }, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, cancelNotification, notificationIdRef]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        isRunning &&
        startTimeRef.current &&
        initialSecondsRef.current > 0
      ) {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTimeRef.current) / 1000);
        const newTotalSeconds = Math.max(
          0,
          initialSecondsRef.current - elapsedSeconds,
        );

        setTotalSeconds(newTotalSeconds);

        if (newTotalSeconds === 0) {
          setIsRunning(false);
          startTimeRef.current = null;
          initialSecondsRef.current = 0;
          notificationIdRef.current = null;
          cancelNotification();
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isRunning, cancelNotification, notificationIdRef]);

  // Handlers
  const handleIncrement = (type: "minutes" | "seconds") => {
    if (isRunning) return;

    if (type === "minutes") {
      setTotalSeconds((prev) => Math.min(prev + 60, 99 * 60 + 59));
    } else {
      setTotalSeconds((prev) => Math.min(prev + 1, 99 * 60 + 59));
    }
  };

  const handleDecrement = (type: "minutes" | "seconds") => {
    if (isRunning) return;

    if (type === "minutes") {
      setTotalSeconds((prev) => Math.max(prev - 60, 0));
    } else {
      setTotalSeconds((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleStartPause = async () => {
    if (totalSeconds === 0) return;

    if (!isRunning) {
      startTimeRef.current = Date.now();
      initialSecondsRef.current = totalSeconds;
      await scheduleNotification(totalSeconds);
    } else {
      initialSecondsRef.current = totalSeconds;
      startTimeRef.current = null;
      await cancelNotification();
    }

    setIsRunning(!isRunning);
  };

  const handleReset = async () => {
    setIsRunning(false);
    setTotalSeconds(0);
    startTimeRef.current = null;
    initialSecondsRef.current = 0;
    await cancelNotification();
  };

  return {
    totalSeconds,
    minutes,
    seconds,
    isRunning,
    setTotalSeconds,
    handleIncrement,
    handleDecrement,
    handleStartPause,
    handleReset,
  };
}
