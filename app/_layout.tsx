import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "./login";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import Firstsong from "./firstsong";
import tab from "../app/(tabs)/_layout";
import Signup from "./signup";
import NotFoundScreen from "./+not-found";
import Secondsong from "./secondsong";
import Threesong from "./threesong";
import Foursong from "./foursong";
import Fifthsong from "./fifthsong";
import login from "./login";
import firstsong from "./firstsong";
import secondsong from "./secondsong";
import threesong from "./threesong";
import foursong from "./foursong";
import fifthsong from "./fifthsong";
import signup from "./signup";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const Stack = createStackNavigator();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/images/mu.png"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />

        <Stack.Screen
          name="firstsong"
          options={{
            headerTitle: "வருகை",
            headerStyle: {
              backgroundColor: "#FFB22C",
            },
          }}
        />
        <Stack.Screen
          name="secondsong"
          options={{
            headerTitle: " தியானம்",
            headerStyle: {
              backgroundColor: "#FFB22C",
            },
          }}
        />

        <Stack.Screen
          name="threesong"
          options={{
            headerTitle: "காணிக்கை",
            headerStyle: {
              backgroundColor: "#FFB22C",
            },
          }}
        />

        <Stack.Screen
          name="foursong"
          options={{
            headerTitle: "திருவிருந்து",
            headerStyle: {
              backgroundColor: "#FFB22C",
            },
          }}
        />

        <Stack.Screen
          name="fifthsong"
          options={{
            headerTitle: "நன்றி",
            headerStyle: {
              backgroundColor: "#FFB22C",
            },
          }}
        />
      </Stack>
    </>
  );
}
