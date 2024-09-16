import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text, StatusBar, Image } from "react-native";
import { Video } from "expo-av";

import { Colors } from "@/constants/Colors";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  type ResizeMode = "cover" | "contain" | "stretch" | "none";
  const onBuffer = () => {
    console.log("====================================");
    console.log();
    console.log("====================================");
  };
  const onERROR = () => {};
  return (
    <>
      {/* <Stack.Screen options={{ title: "Oops!" }} /> */}

      <View style={styles.container}>
        {/* <Video
          source={require("./../assets/videos/jesus_video.mp4")} // Local video file
          style={styles.video}
          useNativeControls
          shouldPlay
          isLooping
          isMuted
        /> */}
        <View>
          <Image
            source={require("./../assets/images/splas.png")}
            style={styles.img}
          />
        </View>
        <Link href="/home" style={styles.buttonContainer}>
          Get Started
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    // padding: 20,
  },
  img: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    // backgroundColor: "#272727",
    textAlign: "center",
    borderRadius: 50,
    overflow: "hidden",
    width: "75%",
    padding: 10,
    // position: "absolute",
    // bottom: 30,
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  video: {
    position: "relative",
    width: "100%",
    height: "100%", // Adjust height as needed
  },
});
