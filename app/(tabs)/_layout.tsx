import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { scale } from "@/src/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@src/components/haptic-tab";
import { IconSymbol } from "@src/components/ui/icon-symbol";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"home"} size={scale(28)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"file-tray-full"} size={scale(28)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="createWorkout"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"add-circle"} size={scale(28)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"timer"} size={scale(28)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
