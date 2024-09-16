import { Tabs } from "expo-router";

import React, { useEffect } from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text } from "react-native";
import tabsicon from "@/components/navigation/tabsicon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FavoriteSongsProvider } from "../FavoriteSongsContext";
import home from "./home";
import search from "./search";
import favorite from "./favorite";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {}, []);
  // const Tabs = createBottomTabNavigator();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 1,
          borderTopWidth: 0,
          backgroundColor: "#FF8225",
          height: 50,
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.light.black,
        tabBarInactiveTintColor: "#999",
      }}
    >
      {/*------Home----------*/}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#fff" : "#686D76",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={{}}>
              <MaterialIcons
                name="home"
                size={24}
                style={{
                  borderRadius: 12,
                  color: focused ? "#fff" : "#686D76",
                }}
              />
            </View>
          ),
        }}
      />
      {/*---Search-----*/}
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarLabelStyle: { color: "#fff", fontWeight: "700" },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#fff" : "#686D76",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="search"
              size={24}
              style={{
                color: focused ? "#fff" : "#686D76",
              }}
            />
          ),
        }}
      />

      {/*--Favourites---*/}
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarLabelStyle: { color: "#fff", fontWeight: "700" },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#fff" : "#686D76",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Favorite
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="favorite"
              size={24}
              style={{
                color: focused ? "#fff" : "#686D76",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
